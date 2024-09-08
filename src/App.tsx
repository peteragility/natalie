import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import WordGame from './components/WordGame';
import ScoreBoard from './components/ScoreBoard';

interface Word {
  id?: string;
  english: string;
  chinese: string;
  example: string;
}

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentRound, setCurrentRound] = useState<Word[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [roundScores, setRoundScores] = useState<{ correct: number; total: number }[]>([]);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/peteragility/natalie/main/README.md');
      const text = await response.text();
      const tableRegex = /\|([^|]+)\|([^|]+)\|([^|]+)\|/g;
      const matches = [...text.matchAll(tableRegex)];
      
      const wordList = matches.slice(2).map((match, index) => ({
        id: index.toString(),
        english: match[1].trim(),
        chinese: match[2].trim(),
        example: match[3].trim()
      }));
      
      setWords(wordList);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const startNewRound = () => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setCurrentRound(shuffled.slice(0, 20));
    setIsPlaying(true);
    setCurrentScore(0);
  };

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setCurrentScore(prevScore => prevScore + (isCorrect ? 1 : 0));
  }, []);

  const handleGameEnd = () => {
    setIsPlaying(false);
    setRoundScores(prevScores => [...prevScores, { correct: currentScore, total: currentRound.length }]);
    console.log(`Round ended. Score: ${currentScore}/${currentRound.length}`);
  };

  return (
    <div className="App">
      <h1>Academic Word Game</h1>
      {isPlaying ? (
        <WordGame
          words={currentRound}
          allWords={words}
          onAnswer={handleAnswer}
          onGameEnd={handleGameEnd}
          maxWords={20}
        />
      ) : (
        <button onClick={startNewRound}>Start New Round</button>
      )}
      <ScoreBoard currentScore={currentScore} roundScores={roundScores} />
    </div>
  );
}

export default App;