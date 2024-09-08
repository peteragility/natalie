import React, { useState, useEffect } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listWords } from './graphql/queries';
import WordCard from './components/WordCard';
import ScoreBoard from './components/ScoreBoard';

interface Word {
  id: string;
  english: string;
  chinese: string;
  example: string;
}

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const wordData: any = await API.graphql(graphqlOperation(listWords));
      const wordList = wordData.data.listWords.items;
      setWords(wordList);
      selectRandomWord(wordList);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const selectRandomWord = (wordList: Word[]) => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
  };

  const handleGuess = (guess: string) => {
    if (currentWord && guess === currentWord.chinese) {
      setScore(score + 1);
      selectRandomWord(words);
    }
  };

  return (
    <div className="App">
      <h1>Academic Word Matching Game</h1>
      <ScoreBoard score={score} />
      {currentWord && (
        <WordCard
          word={currentWord.english}
          example={currentWord.example}
          onGuess={handleGuess}
        />
      )}
    </div>
  );
}

export default App;