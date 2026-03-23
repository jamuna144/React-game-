function ResultDisplay({ playerChoice, computerChoice, result }) {
  const showNoGame = !playerChoice && !computerChoice;

  return (
    <div className="result-display">
      {showNoGame ? (
        <p className="no-game">No game played yet</p>
      ) : (
        <>
          <p>
            You chose: <strong>{playerChoice || '...'}</strong>
          </p>
          <p>
            Computer chose: <strong>{computerChoice || '...'}</strong>
          </p>
          <div className={`result-text ${result === 'Win' ? 'win' : result === 'Lose' ? 'lose' : 'draw'}`}>
            {result}
          </div>
        </>
      )}
    </div>
  );
}

export default ResultDisplay;
