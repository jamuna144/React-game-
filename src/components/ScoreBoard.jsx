function ScoreBoard({ playerName, playerScore, computerScore }) {
  return (
    <div className="score-board">
      <div className="score-card player-score">
        <h2>{playerName}</h2>
        <p>{playerScore}</p>
      </div>
      <div className="score-card computer-score">
        <h2>Computer</h2>
        <p>{computerScore}</p>
      </div>
    </div>
  );
}

export default ScoreBoard;
