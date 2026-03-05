import React, { useState, useEffect } from 'react';
import type { Player } from '../types';
import TechnicalSupport from './TechnicalSupport';

interface EndScreenProps {
  winner: Player | null;
  winnerPhrase: string | null;
  players: Player[];
  currentPlayerId?: string;
  onPlayAgain: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ winner, winnerPhrase, players, currentPlayerId, onPlayAgain }) => {
  const [showSupport, setShowSupport] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const isWinner = !winner || winner.id !== currentPlayerId;

  useEffect(() => {
    setAnimateIn(true);
    if (isWinner) {
      setTimeout(() => setShowFireworks(true), 500);
    }
  }, [isWinner]);

  return (
    <div className={`screen-container ${animateIn ? 'fade-in' : ''}`}>
      {showFireworks && (
        <div className="fireworks-container">
          <div className="firework" />
          <div className="firework" />
          <div className="firework" />
        </div>
      )}

      <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px', width: '100%' }}>
        {isWinner ? (
          <>
            <div className="winner-text">Today is your day!</div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              Поздравляем! Вам удалось избежать ответственности!
            </p>
          </>
        ) : (
          <>
            <div className="loser-text">Next time, but not today</div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              {winnerPhrase || (winner && `${winner.name} набрал ${winner.score} очков и стал главным виновным!`)}
            </p>
          </>
        )}

        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Final Scores</h3>
          {players.map(player => (
            <div 
              key={player.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem 1rem',
                margin: '0.25rem 0',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px'
              }}
            >
              <span>
                {player.name} {player.isBot && '🤖'} {player.id === currentPlayerId && '(you)'}
              </span>
              <div className="player-score">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`score-dot ${i < player.score ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="glass-button"
          onClick={onPlayAgain}
          style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
        >
          Play Again
        </button>
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

export default EndScreen;
