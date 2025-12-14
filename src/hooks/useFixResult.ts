import { useCallback } from 'react';

export type GameResult = {
  difficulty: string;
  time: number; // у секундах
  win: boolean;
  date: string;
};

const LOCAL_STORAGE_KEY = 'sudoku_results';

export const useFixResult = () => {
  const saveResult = useCallback((result: GameResult) => {
    const existing: GameResult[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.push(result);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  }, []);

  const getResults = useCallback((): GameResult[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }, []);

  const clearResults = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  return { saveResult, getResults, clearResults };
};
