import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { StartScreen } from './components/StartScreen';

function App() {
  const {
    game,
    loading,
    error,
    start,
    cut,
    bet,
    draw,
    stay,
    nextRound,
    clearError,
  } = useGame();

  if (game === null) {
    return (
      <StartScreen
        loading={loading}
        error={error}
        onStart={start}
        onClearError={clearError}
      />
    );
  }

  return (
    <GameBoard
      game={game}
      loading={loading}
      error={error}
      onCut={cut}
      onBet={bet}
      onDraw={draw}
      onStay={stay}
      onNextRound={nextRound}
      onClearError={clearError}
    />
  );
}

export default App;