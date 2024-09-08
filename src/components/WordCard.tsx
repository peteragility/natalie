import React from 'react';

interface Word {
  english: string;
  chinese: string;
  example: string;
}

interface WordCardProps {
  word: Word;
  options: string[];
  onGuess: (guess: string) => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, options, onGuess }) => {
  return (
    <div className="word-card">
      <h2>{word.english}</h2>
      <p>{word.example}</p>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onGuess(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordCard;