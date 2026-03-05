import { useState, useEffect, useCallback, useRef } from 'react';
import type { Screen, MatchmakingState } from '../types';
import { generateRandomName, loadDictionaries } from '../data/dictionaries';
import gameService from '../services/gameService';

const MATCHMAKING_TIMEOUT = 10;

export function useGame() {
  const [screen, setScreen] = useState<Screen>('login');
  const [username, setUsername] = useState(generateRandomName);
  const [matchmaking, setMatchmaking] = useState<MatchmakingState>({
    status: 'idle',
    timeRemaining: MATCHMAKING_TIMEOUT,
    playersNeeded: 3
  });
  const [gameState, setGameState] = useState<any>(null);
  const socketRef = useRef<any>(null);
  const [dictionariesLoaded, setDictionariesLoaded] = useState(false);

  useEffect(() => {
    loadDictionaries().then(() => {
      setDictionariesLoaded(true);
      setUsername(generateRandomName());
    });
  }, []);

  useEffect(() => {
    if (!dictionariesLoaded) return;
    const socket = gameService.connect(username);
    socketRef.current = socket;

    socket.on('matchmaking', (data: MatchmakingState) => {
      setMatchmaking(data);
      if (data.status === 'found') {
        setScreen('game');
      }
    });

    socket.on('gameState', (state: any) => {
      setGameState(state);
      if (state.status === 'ended') {
        setScreen('end');
      }
    });

    return () => {
      gameService.disconnect();
    };
  }, [dictionariesLoaded, username]);

  const handlePlayNow = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('joinGame', username);
    }
  }, [username]);

  const handleBlame = useCallback((targetPlayerId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('makeBlame', { targetPlayerId });
    }
  }, []);

  const handlePlayAgain = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('playAgain');
    }
    setScreen('login');
    setUsername(generateRandomName());
    setMatchmaking({
      status: 'idle',
      timeRemaining: MATCHMAKING_TIMEOUT,
      playersNeeded: 3
    });
    setGameState(null);
  }, []);

  const currentPlayer = gameState?.players?.find((p: any) => !p.isBot);

  return {
    screen,
    setScreen,
    username,
    setUsername,
    matchmaking,
    gameState: gameState || {
      status: 'waiting',
      players: [],
      currentRound: 0,
      currentEvent: null,
      currentExcuse: null,
      blameTarget: null,
      allBlamesMade: false,
      winner: null
    },
    handlePlayNow,
    handleBlame,
    handlePlayAgain,
    currentPlayer
  };
}
