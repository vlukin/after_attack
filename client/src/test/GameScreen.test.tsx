import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameScreen from '../components/GameScreen';
import type { GameState } from '../types';

describe('GameScreen', () => {
  const mockGameState: GameState = {
    status: 'playing',
    players: [
      { id: '1', name: 'Human Player', department: 'IT', isBot: false, score: 0 },
      { id: '2', name: 'Bot Alpha', department: 'Finance', isBot: true, score: 1 },
      { id: '3', name: 'Bot Beta', department: 'HR', isBot: true, score: 0 }
    ],
    currentRound: 1,
    currentEvent: {
      id: 1,
      event: 'Test security event',
      consequences: 'Test consequences',
      type: 'phishing'
    },
    currentExcuse: {
      id: 1,
      description: 'Test excuse',
      type: 'phishing'
    },
    blameTarget: null,
    allBlamesMade: false,
    winner: null,
    winnerPhrase: null,
    currentPlayerId: '1',
    selections: {}
  };

  it('should render the game screen', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getByText(/Раунд 1/)).toBeInTheDocument();
  });

  it('should display security event', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getByText('Test security event')).toBeInTheDocument();
  });

  it('should display player cards', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getAllByText(/Human Player/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bot Alpha/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bot Beta/).length).toBeGreaterThan(0);
  });

  it('should display departments', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
  });

  it('should show blame instruction', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getByText(/Подарить проблему/i)).toBeInTheDocument();
  });

  it('should allow selecting bot players', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    const botCard = screen.getAllByText(/Bot Alpha/)[0].closest('.glass-card');
    if (botCard) {
      fireEvent.click(botCard);
    }
  });

  it('should display penalty points counter', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getByText('Penalty Points:')).toBeInTheDocument();
  });

  it('should display Technical Support button', () => {
    render(<GameScreen gameState={mockGameState} onBlame={vi.fn()} />);
    expect(screen.getByText('Technical Support')).toBeInTheDocument();
  });

  it('should show (you) for current player', () => {
    const stateWithCurrentPlayer = {
      ...mockGameState,
      currentPlayerId: '1'
    };
    render(<GameScreen gameState={stateWithCurrentPlayer} onBlame={vi.fn()} />);
    expect(screen.getAllByText(/\(you\)/).length).toBe(1);
  });

  it('should show own selection when selections exist', () => {
    const stateWithSelection = {
      ...mockGameState,
      currentPlayerId: '1',
      selections: { '1': '2' }
    };
    render(<GameScreen gameState={stateWithSelection} onBlame={vi.fn()} />);
    const cards = document.querySelectorAll('.player-card');
    expect(cards[1].classList.contains('tapped')).toBe(true);
  });

  it('should not show other players selections', () => {
    const stateWithOtherSelection = {
      ...mockGameState,
      currentPlayerId: '1',
      selections: { '2': '1' }
    };
    render(<GameScreen gameState={stateWithOtherSelection} onBlame={vi.fn()} />);
    expect(screen.queryByText('Test excuse')).not.toBeInTheDocument();
  });
});
