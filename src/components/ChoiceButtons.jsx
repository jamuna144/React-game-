import Button from './Button';

function ChoiceButtons({ choices, onChoice }) {
  return (
    <div className="choice-buttons">
      {choices.map((choice) => (
        <Button
          key={choice}
          onClick={() => onChoice(choice)}
          variant="secondary"
        >
          {choice}
        </Button>
      ))}
    </div>
  );
}

export default ChoiceButtons;
