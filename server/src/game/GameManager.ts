import type { Player, GameState, SecurityEvent, Excuse } from '../types';
import { generateRandomName, generateRandomDepartment } from '../data/dictionaries';
import { getRandomEvent, getExcuseByType } from '../data/events';
import lastWords from '../data/last_words.json';
import logger from '../logger';

const MAX_PLAYERS = 3;
const POINTS_TO_WIN = 5;
const MATCHMAKING_TIMEOUT = 10;
const ROUND_PREPARE_TIME = 0;

function getRandomWinnerPhrase(): string {
  const phrases = lastWords as { value: string }[];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex].value;
}

export class GameManager {
  private rooms: Map<string, GameRoom> = new Map();
  private io: any = null;

  constructor(io: any) {
    this.io = io;
  }

  private generateRoomId(): string {
    return `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getAvailableRoom(): GameRoom | null {
    for (const room of this.rooms.values()) {
      if (room.status === 'waiting') {
        return room;
      }
    }
    return null;
  }

  addPlayer(socketId: string, username: string): Player | null {
    let room = this.getAvailableRoom();
    
    if (!room) {
      room = {
        id: this.generateRoomId(),
        players: [],
        status: 'waiting',
        currentRound: 0,
        currentEvent: null,
        currentExcuse: null,
        blameTarget: null,
        allBlamesMade: false,
        winner: null,
        winnerPhrase: null,
        selections: {},
        matchmakingTimeout: null,
        roundTimeout: null,
        timerStarted: false,
        timeRemaining: MATCHMAKING_TIMEOUT
      };
      this.rooms.set(room.id, room);
      logger.info(`[${room.id}] Created new room`);
    }

    const player: Player = {
      id: socketId,
      name: username,
      department: generateRandomDepartment(),
      isBot: false,
      score: 0,
      socketId,
      roomId: room.id
    };

    room.players.push(player);

    if (!room.timerStarted) {
      room.timerStarted = true;
      room.timeRemaining = MATCHMAKING_TIMEOUT;
      this.startMatchmakingTimer(room);
    } else {
      this.io.to(socketId).emit('matchmaking', {
        status: 'searching',
        timeRemaining: room.timeRemaining,
        playersNeeded: Math.max(0, MAX_PLAYERS - room.players.length)
      });
    }

    if (room.players.length >= MAX_PLAYERS) {
      this.startGameWithEnoughPlayers(room);
    }

    return player;
  }

  removePlayer(socketId: string): void {
    for (const room of this.rooms.values()) {
      const index = room.players.findIndex(p => p.socketId === socketId);
      if (index !== -1) {
        room.players.splice(index, 1);
        
        if (room.players.length === 0 && room.status === 'waiting') {
          if (room.matchmakingTimeout) {
            clearTimeout(room.matchmakingTimeout);
          }
          this.rooms.delete(room.id);
          logger.info(`[${room.id}] Room deleted (no players)`);
        }
        break;
      }
    }
  }

  private startMatchmakingTimer(room: GameRoom): void {
    if (room.matchmakingTimeout) {
      clearTimeout(room.matchmakingTimeout);
    }

    const tick = () => {
      if (room.players.length >= MAX_PLAYERS) {
        return;
      }
      
      if (room.timeRemaining <= 0) {
        this.startGameWithBots(room);
        return;
      }
      
      room.players.forEach(player => {
        if (player.socketId) {
          this.io.to(player.socketId).emit('matchmaking', {
            status: 'searching',
            timeRemaining: room.timeRemaining,
            playersNeeded: Math.max(0, MAX_PLAYERS - room.players.length)
          });
        }
      });
      
      room.timeRemaining--;
      room.matchmakingTimeout = setTimeout(tick, 1000);
    };

    room.matchmakingTimeout = setTimeout(tick, 1000);
  }

  private startGameWithEnoughPlayers(room: GameRoom): void {
    if (room.matchmakingTimeout) {
      clearTimeout(room.matchmakingTimeout);
      room.matchmakingTimeout = null;
    }

    logger.info(`[${room.id}] Starting game with ${room.players.length} players`);

    const botsNeeded = MAX_PLAYERS - room.players.length;
    for (let i = 0; i < botsNeeded; i++) {
      room.players.push(this.createBot(room.id));
    }

    room.status = 'countdown';
    room.selections = {};
    room.winner = null;
    room.winnerPhrase = null;

    room.players.forEach(player => {
      if (player.socketId) {
        this.io.to(player.socketId).emit('matchmaking', {
          status: 'found',
          timeRemaining: 0,
          playersNeeded: 0
        });
      }
    });

    this.broadcastRoomState(room);
    setTimeout(() => this.startRound(room), ROUND_PREPARE_TIME * 1000);
  }

  private startGameWithBots(room: GameRoom): void {
    logger.info(`[${room.id}] Starting game with bots, ${room.players.length} players`);

    const botsNeeded = MAX_PLAYERS - room.players.length;
    for (let i = 0; i < botsNeeded; i++) {
      room.players.push(this.createBot(room.id));
    }

    room.status = 'countdown';
    room.selections = {};
    room.winner = null;
    room.winnerPhrase = null;

    room.players.forEach(player => {
      if (player.socketId) {
        this.io.to(player.socketId).emit('matchmaking', {
          status: 'found',
          timeRemaining: 0,
          playersNeeded: 0
        });
      }
    });

    this.broadcastRoomState(room);
    setTimeout(() => this.startRound(room), ROUND_PREPARE_TIME * 1000);
  }

  private createBot(roomId: string): Player {
    return {
      id: `bot-${Date.now()}-${Math.random()}`,
      name: generateRandomName(),
      department: generateRandomDepartment(),
      isBot: true,
      score: 0,
      roomId
    };
  }

  private shufflePlayers(players: Player[]): Player[] {
    return [...players].sort(() => Math.random() - 0.5);
  }

  private startRound(room: GameRoom): void {
    const event = getRandomEvent();
    const excuse = getExcuseByType(event.type);

    room.status = 'playing';
    room.currentRound++;
    room.currentEvent = event;
    room.currentExcuse = excuse;
    room.blameTarget = null;
    room.allBlamesMade = false;
    room.selections = {};

    this.broadcastRoomState(room);
    
    room.players
      .filter(p => p.isBot)
      .forEach(bot => {
        setTimeout(() => {
          this.processBotSelection(bot.id, room);
        }, Math.random() * 2000 + 500);
      });
  }

  private processBotSelection(botId: string, room: GameRoom): void {
    if (room.status !== 'playing') return;
    if (Object.keys(room.selections).length >= room.players.length) return;
    
    const availableTargets = room.players
      .filter(p => p.id !== botId)
      .map(p => p.id);
    
    if (availableTargets.length === 0) return;
    
    const randomTarget = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    room.selections[botId] = randomTarget;
    
    this.checkAllSelectionsMade(room);
  }

  makeBlame(socketId: string, targetPlayerId: string): void {
    const room = this.findRoomBySocketId(socketId);
    if (!room || room.status !== 'playing') return;
    
    const blameGiver = room.players.find(p => p.socketId === socketId);
    if (!blameGiver || blameGiver.isBot) return;
    if (room.selections[socketId]) return;

    const tappedPlayer = room.players.find(p => p.id === targetPlayerId);
    if (!tappedPlayer) return;

    room.selections[socketId] = targetPlayerId;
    
    this.checkAllSelectionsMade(room);
  }

  private checkAllSelectionsMade(room: GameRoom): void {
    if (room.status !== 'playing') return;
    
    const humanPlayers = room.players.filter(p => !p.isBot);
    const humanSelections = humanPlayers.filter(p => p.socketId && room.selections[p.socketId]);
    
    this.broadcastRoomState(room);
    
    if (humanSelections.length < humanPlayers.length) {
      return;
    }

    const allSelectionsMade = room.players.every(p => {
      if (p.isBot) {
        return room.selections[p.id];
      } else {
        return p.socketId && room.selections[p.socketId];
      }
    });

    if (!allSelectionsMade) {
      return;
    }

    const tappedCount: Record<string, number> = {};
    Object.entries(room.selections).forEach(([_, targetId]) => {
      tappedCount[targetId] = (tappedCount[targetId] || 0) + 1;
    });

    room.players = room.players.map(p => ({
      ...p,
      score: p.score + (tappedCount[p.id] || 0)
    }));

    const winner = room.players.find(p => p.score >= POINTS_TO_WIN);
    const blameTarget = Object.values(room.selections)[0];

    room.blameTarget = blameTarget;
    room.allBlamesMade = true;
    room.winner = winner || null;
    room.winnerPhrase = winner ? getRandomWinnerPhrase() : null;
    room.status = winner ? 'ended' : 'playing';

    this.broadcastRoomState(room);

    if (winner) {
      return;
    }

    if (room.roundTimeout) {
      clearTimeout(room.roundTimeout);
    }
    
    room.roundTimeout = setTimeout(() => {
      this.startRound(room);
    }, 5000);
  }

  private broadcastRoomState(room: GameRoom): void {
    const { matchmakingTimeout, roundTimeout, timerStarted, timeRemaining, ...gameStateWithoutInternals } = room;
    
    const safePlayers = room.players.map(p => ({
      ...p,
      socketId: undefined
    }));

    room.players.forEach(player => {
      if (player.socketId) {
        const playerSelection = player.socketId ? room.selections[player.socketId] : null;
        
        this.io.to(player.socketId).emit('gameState', {
          ...gameStateWithoutInternals,
          players: safePlayers,
          currentEvent: room.currentEvent,
          currentExcuse: room.currentExcuse ? {
            id: room.currentExcuse.id,
            description: room.currentExcuse.description,
            type: room.currentExcuse.type
          } : null,
          currentPlayerId: player.id,
          selections: playerSelection ? { [player.socketId]: playerSelection } : {},
          blameTarget: room.allBlamesMade ? room.blameTarget : null,
          allBlamesMade: room.allBlamesMade
        });
      }
    });
  }

  private findRoomBySocketId(socketId: string): GameRoom | null {
    for (const room of this.rooms.values()) {
      if (room.players.some(p => p.socketId === socketId)) {
        return room;
      }
    }
    return null;
  }

  getGameState(): GameState | null {
    for (const room of this.rooms.values()) {
      if (room.status === 'playing' || room.status === 'ended' || room.status === 'countdown') {
        return {
          status: room.status,
          players: room.players,
          currentRound: room.currentRound,
          currentEvent: room.currentEvent,
          currentExcuse: room.currentExcuse,
          blameTarget: room.blameTarget,
          allBlamesMade: room.allBlamesMade,
          winner: room.winner,
          winnerPhrase: room.winnerPhrase,
          selections: room.selections
        };
      }
    }
    return null;
  }

  getSessionId(): string {
    for (const room of this.rooms.values()) {
      if (room.status === 'playing' || room.status === 'ended' || room.status === 'countdown') {
        return room.id;
      }
    }
    return 'no-session';
  }

  reset(socketId?: string): void {
    if (!socketId) return;
    const room = this.findRoomBySocketId(socketId);
    if (!room) return;
    
    if (room.matchmakingTimeout) {
      clearTimeout(room.matchmakingTimeout);
      room.matchmakingTimeout = null;
    }
    if (room.roundTimeout) {
      clearTimeout(room.roundTimeout);
      room.roundTimeout = null;
    }
    room.players = [];
    room.status = 'waiting';
    room.selections = {};
    room.winner = null;
    room.winnerPhrase = null;
    room.currentRound = 0;
    room.timerStarted = false;
    room.timeRemaining = MATCHMAKING_TIMEOUT;
  }
}

interface GameRoom {
  id: string;
  players: Player[];
  status: 'waiting' | 'countdown' | 'playing' | 'ended';
  currentRound: number;
  currentEvent: SecurityEvent | null;
  currentExcuse: Excuse | null;
  blameTarget: string | null;
  allBlamesMade: boolean;
  winner: Player | null;
  winnerPhrase: string | null;
  selections: Record<string, string>;
  matchmakingTimeout: NodeJS.Timeout | null;
  roundTimeout: NodeJS.Timeout | null;
  timerStarted: boolean;
  timeRemaining: number;
}
