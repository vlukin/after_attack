import { useGame } from './hooks/useGame';
import LoginScreen from './components/LoginScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import './index.css';

function App() {
  const {
    screen,
    username,
    setUsername,
    matchmaking,
    gameState,
    handlePlayNow,
    handleBlame,
    handlePlayAgain
  } = useGame();

  return (
    <>
      {screen === 'login' && (
        <LoginScreen
          username={username}
          onUsernameChange={setUsername}
          onPlayNow={handlePlayNow}
          matchmaking={matchmaking}
        />
      )}

      {screen === 'game' && gameState && (
        <GameScreen
          gameState={gameState}
          onBlame={handleBlame}
        />
      )}

      {screen === 'end' && gameState && gameState.status === 'ended' && (
        <EndScreen
          winner={gameState.winner}
          winnerPhrase={gameState.winnerPhrase}
          players={gameState.players}
          currentPlayerId={gameState.currentPlayerId}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}

export default App;
