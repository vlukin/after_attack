import React, { useState, useEffect } from 'react';
import type { MatchmakingState } from '../types';
import { generateRandomName } from '../data/dictionaries';
import TechnicalSupport from './TechnicalSupport';

interface LoginScreenProps {
  username: string;
  onUsernameChange: (name: string) => void;
  onPlayNow: () => void;
  matchmaking: MatchmakingState;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  username,
  onUsernameChange,
  onPlayNow,
  matchmaking
}) => {
  const [showSupport, setShowSupport] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const validateUsername = (name: string): boolean => {
    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      setValidationError('Имя должно быть от 1 до 100 символов');
      return false;
    }
    const validPattern = /^[а-яА-ЯёЁa-zA-Z0-9\s\-_]+$/;
    if (!validPattern.test(trimmed)) {
      setValidationError('Имя содержит недопустимые символы');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleUsernameChange = (value: string) => {
    onUsernameChange(value);
    if (validationError) {
      validateUsername(value);
    }
  };

  const handleRefreshName = () => {
    const newName = generateRandomName();
    onUsernameChange(newName);
    setValidationError(null);
  };

  const handlePlayNowClick = () => {
    if (validateUsername(username)) {
      onPlayNow();
    }
  };

  const progress = ((10 - matchmaking.timeRemaining) / 10) * 100;

  return (
    <div className={`screen-container ${animateIn ? 'fade-in' : ''}`}>
      <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px', width: '100%', margin: '0 auto' }}>
        <img 
          src="/favicon.jpg" 
          alt="After Attack" 
          style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', marginBottom: '1rem' }}
        />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent)' }}>
          After Attack
        </h1>
        
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Your Name
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <input
                type="text"
                className="glass-input"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="Enter your name"
                maxLength={100}
              />
              <button
                className="glass-button"
                onClick={handleRefreshName}
                style={{ padding: '1rem' }}
                title="Generate new name"
              >
                🎲
              </button>
            </div>
            {validationError && (
              <span style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {validationError}
              </span>
            )}
          </div>
        </div>

        {matchmaking.status === 'searching' ? (
          <div>
            <p className="waiting-text">Waiting for players...</p>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              {matchmaking.timeRemaining}s remaining
            </p>
          </div>
        ) : matchmaking.status === 'full' ? (
          <div>
            <p className="waiting-text" style={{ color: 'var(--accent)' }}>Game is full!</p>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              This game already has 3 players. Please try again later.
            </p>
          </div>
        ) : (
          <button
            className="glass-button"
            onClick={handlePlayNowClick}
            style={{ fontSize: '1.3rem', padding: '1rem 3rem' }}
          >
            Play Now
          </button>
        )}
      </div>

      <button 
        className="support-button"
        onClick={() => setShowSupport(true)}
      >
        Technical Support
      </button>

      {showSupport && <TechnicalSupport onClose={() => setShowSupport(false)} />}
    </div>
  );
};

export default LoginScreen;
