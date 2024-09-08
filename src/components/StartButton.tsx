import React from 'react';

interface StartButtonProps {
  onStart: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <button className="start-button" onClick={onStart}>
      Start New Round
    </button>
  );
};

export default StartButton;