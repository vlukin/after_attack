import React, { useState, useEffect } from 'react';
import type { GameState } from '../types';
import TechnicalSupport from './TechnicalSupport';

interface GameScreenProps {
  gameState: GameState;
  onBlame: (playerId: string) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ gameState, onBlame }) => {
  const [showSupport, setShowSupport] = useState(false);
  const [selectedExcuse, setSelectedExcuse] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [prevRound, setPrevRound] = useState(gameState.currentRound);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    if (gameState.currentRound !== prevRound) {
      setPrevRound(gameState.currentRound);
    }
  }, [gameState.currentRound, prevRound]);

  useEffect(() => {
    if (gameState.status === 'playing') {
      setSelectedPlayer(null);
      setSelectedExcuse(null);
    }
  }, [gameState.currentRound, gameState.status, prevRound]);

  useEffect(() => {
    if (gameState.blameTarget) {
      setSelectedPlayer(gameState.blameTarget);
      if (gameState.currentExcuse) {
        setSelectedExcuse(gameState.currentExcuse.description);
      }
    } else if (gameState.selections && gameState.currentPlayerId) {
      const mySelection = gameState.selections[gameState.currentPlayerId];
      if (mySelection) {
        setSelectedPlayer(mySelection);
      }
    }
  }, [gameState.blameTarget, gameState.currentExcuse, gameState.selections, gameState.currentPlayerId]);

  const handleSelectPlayer = (playerId: string) => {
    if (selectedPlayer || gameState.blameTarget) return;
    setSelectedPlayer(playerId);
    onBlame(playerId);
  };

  return (
    <div className={`screen-container ${animateIn ? 'fade-in' : ''}`}>
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(8px)',
        borderRadius: '8px',
        border: '1px solid var(--border-glass)'
      }}>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Penalty Points:</span>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {gameState.players.map(p => (
            <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '1rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{p.name}</span>
              <div style={{ display: 'flex', gap: '0.15rem' }}>
                <div 
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '4px', 
                    background: p.score > 0 ? 'var(--accent)' : 'var(--border-glass)',
                    boxShadow: p.score > 0 ? '0 0 8px var(--accent-glow)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}
                >
                  {p.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>
          Раунд {gameState.currentRound}
        </h2>
      </div>

      {gameState.currentEvent && (
        <div className="glass-panel event-display" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="event-title">Security Incident</div>
          <div className="event-text">{gameState.currentEvent.event}</div>
          <div className="event-consequences">
            <div className="event-title">Последствия</div>
            <div className="event-text">{gameState.currentEvent.consequences}</div>
          </div>
        </div>
      )}

      {gameState.status === 'playing' && (
        <>
          <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>
            Подарить проблему
          </p>
          <div className="players-grid">
            {gameState.players.map(player => {
              const mySelection = gameState.selections?.[gameState.currentPlayerId || ''];
              const isSelected = mySelection === player.id;
              const isDisabled = !!mySelection || player.id === gameState.currentPlayerId;
              return (
                <div
                  key={player.id}
                  className={`glass-card player-card ${isSelected ? 'tapped' : ''}`}
                  onClick={() => !isDisabled && handleSelectPlayer(player.id)}
                  style={{ 
                    cursor: isDisabled ? 'default' : 'pointer',
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border-glass)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {!isDisabled && (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid var(--accent)' : '2px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isSelected ? 'var(--accent)' : 'transparent'
                      }}>
                        {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                      </div>
                    )}
                    <div className="player-name">
                      {player.name} {player.isBot && '🤖'} {player.id === gameState.currentPlayerId && '(you)'}
                    </div>
                  </div>
                  <div className="player-department">{player.department}</div>
                  {isSelected && selectedExcuse && (
                    <div style={{ 
                      marginTop: '0.5rem', 
                      padding: '0.5rem', 
                      background: 'rgba(233, 69, 96, 0.2)',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}>
                      "{selectedExcuse}"
                    </div>
                  )}
                </div>
              );
            })}
            </div>
        </>
      )}

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

export default GameScreen;
