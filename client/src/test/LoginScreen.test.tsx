import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginScreen from '../components/LoginScreen';

describe('LoginScreen', () => {
  const defaultProps = {
    username: 'Test User',
    onUsernameChange: vi.fn(),
    onPlayNow: vi.fn(),
    matchmaking: {
      status: 'idle' as const,
      timeRemaining: 10,
      playersNeeded: 3
    }
  };

  it('should render the login screen', () => {
    render(<LoginScreen {...defaultProps} />);
    expect(screen.getByText('After Attack')).toBeInTheDocument();
  });

  it('should show Play Now button', () => {
    render(<LoginScreen {...defaultProps} />);
    expect(screen.getByText('Play Now')).toBeInTheDocument();
  });

  it('should call onUsernameChange when input changes', () => {
    render(<LoginScreen {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Name' } });
    expect(defaultProps.onUsernameChange).toHaveBeenCalledWith('New Name');
  });

  it('should call onPlayNow when Play Now is clicked', () => {
    render(<LoginScreen {...defaultProps} />);
    const button = screen.getByText('Play Now');
    fireEvent.click(button);
    expect(defaultProps.onPlayNow).toHaveBeenCalled();
  });

  it('should call onPlayNow for valid username', () => {
    render(<LoginScreen {...defaultProps} username="Valid Name" />);
    const button = screen.getByText('Play Now');
    fireEvent.click(button);
    expect(defaultProps.onPlayNow).toHaveBeenCalled();
  });

  it('should call onPlayNow for username with hyphens and underscores', () => {
    render(<LoginScreen {...defaultProps} username="Test-User_123" />);
    const button = screen.getByText('Play Now');
    fireEvent.click(button);
    expect(defaultProps.onPlayNow).toHaveBeenCalled();
  });

  it('should show validation error for empty username', () => {
    render(<LoginScreen {...defaultProps} username="" />);
    const button = screen.getByText('Play Now');
    fireEvent.click(button);
    expect(screen.getByText(/от 1 до 100 символов/i)).toBeInTheDocument();
  });

  it('should show validation error for username longer than 100 characters', () => {
    const longName = 'A'.repeat(101);
    render(<LoginScreen {...defaultProps} username={longName} />);
    const button = screen.getByText('Play Now');
    fireEvent.click(button);
    expect(screen.getByText(/от 1 до 100 символов/i)).toBeInTheDocument();
  });

  it('should allow exactly 100 character username', () => {
    const exactName = 'A'.repeat(100);
    render(<LoginScreen {...defaultProps} username={exactName} />);
    const button = screen.getByText('Play Now');
    fireEvent.click(button);
    expect(defaultProps.onPlayNow).toHaveBeenCalled();
  });

  it('should show progress bar when matchmaking', () => {
    render(<LoginScreen {...defaultProps} matchmaking={{
      status: 'searching',
      timeRemaining: 15,
      playersNeeded: 2
    }} />);
    expect(screen.getByText(/waiting for players/i)).toBeInTheDocument();
  });

  it('should show Technical Support button', () => {
    render(<LoginScreen {...defaultProps} />);
    expect(screen.getByText('Technical Support')).toBeInTheDocument();
  });
});
