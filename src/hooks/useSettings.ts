import { useState } from 'react';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DifficultySettings = {
  size: number;     
  maxAttempts: number | null; 
};

const difficultyMap: Record<Difficulty, DifficultySettings> = {
  Easy: { size: 3, maxAttempts: null },
  Medium: { size: 9, maxAttempts: 6 },
  Hard: { size: 12, maxAttempts: 3 },
};

export const useSettings = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const currentSettings = difficultyMap[difficulty];

  return {
    difficulty,
    setDifficulty,
    currentSettings,
  };
};

