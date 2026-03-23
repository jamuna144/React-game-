import { useEffect, useState } from 'react';
import ScoreBoard from '../components/ScoreBoard';
import ChoiceButtons from '../components/ChoiceButtons';
import ResultDisplay from '../components/ResultDisplay';
import Button from '../components/Button';

const CHOICES = ['Rock', 'Paper', 'Scissors'];

const getWinner = (player, computer) => {
  if (!player || !computer) return 'No Result';
  if (player === computer) return 'Draw';
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Scissors' && computer === 'Paper') ||
    (player === 'Paper' && computer === 'Rock')
  ) {
    return 'Win';
  }
  return 'Lose';
};

function GameContainer() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('No game played yet');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('Player');

  useEffect(() => {
    const storedPlayerScore = Number(localStorage.getItem('playerScore'));
    const storedComputerScore = Number(localStorage.getItem('computerScore'));

    if (!Number.isNaN(storedPlayerScore)) setPlayerScore(storedPlayerScore);
    if (!Number.isNaN(storedComputerScore)) setComputerScore(storedComputerScore);
  }, []);

  useEffect(() => {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
  }, [playerScore, computerScore]);

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
  };

  const determineWinner = (player, computer) => {
    const gameResult = getWinner(player, computer);
    setResult(gameResult);

    if (gameResult === 'Win') {
      setPlayerScore((prev) => prev + 1);
    } else if (gameResult === 'Lose') {
      setComputerScore((prev) => prev + 1);
    }
  };

  const handlePlayerChoice = (choice) => {
    if (!CHOICES.includes(choice)) {
      setResult('Invalid choice. Select Rock, Paper or Scissors.');
      return;
    }

    setPlayerChoice(choice);
    setLoading(true);
    setResult('');

    setTimeout(() => {
      const computer = generateComputerChoice();
      setComputerChoice(computer);
      determineWinner(choice, computer);
      setLoading(false);
    }, 900);
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('No game played yet');
    setPlayerScore(0);
    setComputerScore(0);
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
  };

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors</h1>

      <div className="username-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value || 'Player')}
          placeholder="Enter your name"
        />
      </div>

      <ScoreBoard
        playerName={username}
        playerScore={playerScore}
        computerScore={computerScore}
      />

      <ChoiceButtons choices={CHOICES} onChoice={handlePlayerChoice} />

      {loading ? (
        <div className="loading-state">Computer is thinking...</div>
      ) : (
        <ResultDisplay
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          result={result}
        />
      )}

      <div className="controls">
        <Button onClick={resetGame} variant="danger" disabled={loading}>
          Reset Game
        </Button>
      </div>
    </div>
  );
}

export default GameContainer;
