export interface Player {
  id: string;
  name: string;
  department: string;
  isBot: boolean;
  score: number;
}

export interface SecurityEvent {
  id: number;
  event: string;
  consequences: string;
  type: string;
}

export interface Excuse {
  id: number;
  description: string;
  type: string;
}

export interface GameState {
  status: 'waiting' | 'countdown' | 'playing' | 'ended';
  players: Player[];
  currentRound: number;
  currentEvent: SecurityEvent | null;
  currentExcuse: Excuse | null;
  blameTarget: string | null;
  allBlamesMade: boolean;
  winner: Player | null;
  winnerPhrase: string | null;
  currentPlayerId?: string;
  selections?: Record<string, string>;
}

export interface MatchmakingState {
  status: 'idle' | 'searching' | 'found' | 'full';
  timeRemaining: number;
  playersNeeded: number;
}

export type Screen = 'login' | 'game' | 'end';
