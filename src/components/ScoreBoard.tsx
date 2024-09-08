import React from 'react';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="score-board">
      <h3>Score: {score}</h3>
    </div>
  );
};

export default ScoreBoard;