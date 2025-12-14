import { useState } from 'react';
import type { Board } from './useGame';

export const useCheckAnswer = () => {
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  const checkAnswer = (board: Board, maxAttempts: number | null): boolean => {
    const size = board.length;

    for (let i = 0; i < size; i++) {
      const rowSet = new Set<number>();
      const colSet = new Set<number>();
      for (let j = 0; j < size; j++) {
        const rowVal = board[i][j];
        const colVal = board[j][i];
        if (rowVal === null || colVal === null) return false;
        if (rowSet.has(rowVal) || colSet.has(colVal)) return false;
        rowSet.add(rowVal);
        colSet.add(colVal);
      }
    }

    if (maxAttempts !== null) {
      setAttemptsLeft(prev => (prev === null ? maxAttempts - 1 : prev - 1));
    }

    return true;
  };

  return {
    attemptsLeft,
    setAttemptsLeft,
    checkAnswer,
  };
};
