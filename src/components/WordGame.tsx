import React, { useState, useEffect, useCallback } from 'react';
import './WordGame.css';

interface Word {
  id?: string;
  english: string;
  chinese: string;
  example: string;
}

interface WordGameProps {
  words: Word[];
  allWords: Word[];
  onAnswer: (isCorrect: boolean) => void;
  onGameEnd: () => void;
  maxWords: number;
}

function WordGame({ words, allWords, onAnswer, onGameEnd, maxWords }: WordGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [answeredCount, setAnsweredCount] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answered, setAnswered] = useState(false);

  const QUESTIONS_PER_ROUND = 20;

  const generateOptions = useCallback(() => {
    const correctAnswer = words[currentWordIndex].chinese;
    const incorrectOptions = allWords
      .filter(word => word.chinese !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(word => word.chinese);
    
    setOptions([correctAnswer, ...incorrectOptions].sort(() => 0.5 - Math.random()));
  }, [words, allWords, currentWordIndex]);

  useEffect(() => {
    if (words.length > 0) {
      generateOptions();
      setTimeLeft(15);
      setIsAnswering(true);
    }
  }, [words, currentWordIndex, generateOptions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnswering && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(time => time - 1), 1000);
    } else if (timeLeft === 0 && isAnswering) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswering]);

  const handleTimeUp = () => {
    setIsAnswering(false);
    setAnswered(true);
    onAnswer(false);
    setMessage('Time\'s up!');
    setAnsweredCount(prev => prev + 1);
    
    setTimeout(moveToNextQuestion, 2000);
  };

  const moveToNextQuestion = () => {
    setMessage('');
    setSelectedOption(null);
    setAnswered(false);
    if (answeredCount + 1 >= QUESTIONS_PER_ROUND) {
      onGameEnd();
    } else {
      setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isAnswering) return;

    const isCorrect = option === words[currentWordIndex].chinese;
    setSelectedOption(option);
    setIsAnswering(false);
    setAnswered(true);
    onAnswer(isCorrect);
    
    if (isCorrect) {
      setCurrentScore(prevScore => prevScore + 1);
    }
    
    setAnsweredCount(prev => prev + 1);
    
    setTimeout(moveToNextQuestion, 2000);
  };

  if (answeredCount >= maxWords || currentWordIndex >= words.length) {
    return <div>Round Completed!</div>;
  }

  return (
    <div className="word-game">
      <div className="game-header">
        <div className="timer">Time left: {timeLeft}s</div>
        <p className="current-score">Score: {currentScore} / {answeredCount}</p>
      </div>
      <div className="question-area">
        <div className="question-header">
          <h2>{words[currentWordIndex].english}</h2>
          <button className="read-aloud-button" onClick={() => speak(words[currentWordIndex].english)}>🔊</button>
        </div>
        <div className="example-container">
          <p className="example">{words[currentWordIndex].example}</p>
          <button className="read-aloud-button" onClick={() => speak(words[currentWordIndex].example)}>🔊</button>
        </div>
      </div>
      <div className="options-grid">
        {options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleOptionClick(option)}
            className={`option-button ${['red', 'blue', 'yellow', 'green'][index]} ${
              answered || !isAnswering
                ? option === words[currentWordIndex].chinese
                  ? 'correct'
                  : option === selectedOption
                    ? 'incorrect blurred'
                    : 'blurred'
                : ''
            }`}
            disabled={!isAnswering}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="game-footer">
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

export default WordGame;