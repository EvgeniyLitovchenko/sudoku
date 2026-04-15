import { useState, useEffect } from 'react';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DifficultySettings = {
  size: number;
  maxAttempts: number | null;
};

const difficultyMap: Record<Difficulty, DifficultySettings> = {
  Easy: { size: 4, maxAttempts: null },
  Medium: { size: 9, maxAttempts: 6 },
  Hard: { size: 16, maxAttempts: 3 },
};

/**
 * Хук useSettings для керування налаштуваннями гри та збереження вибору складності в localStorage.
 * @returns {any}
 */
export const useSettings = () => {
  const storedDifficulty = localStorage.getItem('sudokuDifficulty') as Difficulty | null;
  const [difficulty, setDifficulty] = useState<Difficulty>(storedDifficulty ?? 'Easy');

  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  const currentSettings = difficultyMap[difficulty] ?? difficultyMap['Easy'];

  return {
    difficulty,
    setDifficulty,
    currentSettings,
  };
};

