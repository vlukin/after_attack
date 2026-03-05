import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EndScreen from '../components/EndScreen';
import type { Player } from '../types';

describe('EndScreen', () => {
  const mockPlayers: Player[] = [
    { id: '1', name: 'Current Player', department: 'IT', isBot: false, score: 1 },
    { id: '2', name: 'Winner Player', department: 'Finance', isBot: false, score: 3 },
    { id: '3', name: 'Bot Player', department: 'HR', isBot: true, score: 0 }
  ];

  it('should render winner screen when current player is not winner', () => {
    const winner = mockPlayers[1];
    render(<EndScreen winner={winner} winnerPhrase={null} players={mockPlayers} onPlayAgain={vi.fn()} />);
    expect(screen.getByText(/Today is your day!/i)).toBeInTheDocument();
  });

  it('should render loser screen when current player is winner', () => {
    const winner = mockPlayers[0];
    render(<EndScreen winner={winner} winnerPhrase={null} players={mockPlayers} onPlayAgain={vi.fn()} />);
    expect(screen.getByText(/Next time, but not today/i)).toBeInTheDocument();
  });

  it('should display final scores', () => {
    const winner = mockPlayers[1];
    render(<EndScreen winner={winner} winnerPhrase={null} players={mockPlayers} onPlayAgain={vi.fn()} />);
    expect(screen.getByText('Итоговый счет')).toBeInTheDocument();
    expect(screen.getByText('Current Player')).toBeInTheDocument();
    expect(screen.getByText('Winner Player')).toBeInTheDocument();
  });

  it('should display Play Again button', () => {
    const winner = mockPlayers[1];
    render(<EndScreen winner={winner} winnerPhrase={null} players={mockPlayers} onPlayAgain={vi.fn()} />);
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('should call onPlayAgain when Play Again is clicked', () => {
    const onPlayAgain = vi.fn();
    const winner = mockPlayers[1];
    render(<EndScreen winner={winner} winnerPhrase={null} players={mockPlayers} onPlayAgain={onPlayAgain} />);
    
    const button = screen.getByText('Play Again');
    fireEvent.click(button);
    
    expect(onPlayAgain).toHaveBeenCalled();
  });

  it('should show Technical Support button', () => {
    const winner = mockPlayers[1];
    render(<EndScreen winner={winner} winnerPhrase={null} players={mockPlayers} onPlayAgain={vi.fn()} />);
    expect(screen.getByText('Technical Support')).toBeInTheDocument();
  });
});
