import React from 'react';

interface ScoreBoardProps {
  currentScore: number;
  roundScores: { correct: number; total: number }[];
}

function ScoreBoard({ currentScore, roundScores }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <h2>Current Score: {currentScore}</h2>
      {roundScores.length > 0 && (
        <>
          <h3>Round Scores:</h3>
          <ul>
            {roundScores.map((score, index) => (
              <li key={index}>
                Round {index + 1}: {score.correct}/{score.total}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ScoreBoard;