import React, { useState } from 'react';

interface WordCardProps {
  word: string;
  example: string;
  onGuess: (guess: string) => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, example, onGuess }) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuess(guess);
    setGuess('');
  };

  return (
    <div className="word-card">
      <h2>{word}</h2>
      <p>{example}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter Chinese translation"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WordCard;