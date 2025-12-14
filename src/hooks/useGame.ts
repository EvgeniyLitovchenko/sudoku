// useGame.ts
import { useState, useEffect } from 'react';
import type { DifficultySettings } from './useSettings';

export type CellValue = number | null;
export type Board = CellValue[][];

const emptyBoard = (size: number): Board =>
  Array.from({ length: size }, () => Array(size).fill(null));

const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateSudokuBoard = (size: number): Board => {
  const sqrt = Math.sqrt(size);
  if (!Number.isInteger(sqrt)) throw new Error('Size must be a perfect square');

  const board: Board = emptyBoard(size);

  const isSafe = (row: number, col: number, num: number) => {
    for (let i = 0; i < size; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = row - (row % sqrt);
    const startCol = col - (col % sqrt);
    for (let r = 0; r < sqrt; r++) {
      for (let c = 0; c < sqrt; c++) {
        if (board[startRow + r][startCol + c] === num) return false;
      }
    }
    return true;
  };

  const fillBoard = (): boolean => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === null) {
          const numbers = shuffle([...Array(size)].map((_, i) => i + 1));
          for (const num of numbers) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              if (fillBoard()) return true;
              board[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillBoard();
  return board;
};

export const useGame = (settings: DifficultySettings) => {
  const [board, setBoard] = useState<CellValue[][]>([]);
  const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const generateBoardWithHoles = () => {
    const full = generateSudokuBoard(settings.size);
    const newBoard: Board = full.map(r => [...r]);
    const newFixed: boolean[][] = full.map(r => r.map(() => true));

    const removeCount = Math.floor(settings.size * settings.size * 0.6);
    let removed = 0;
    while (removed < removeCount) {
      const row = Math.floor(Math.random() * settings.size);
      const col = Math.floor(Math.random() * settings.size);
      if (newBoard[row][col] !== null) {
        newBoard[row][col] = null;
        newFixed[row][col] = false;
        removed++;
      }
    }

    setBoard(newBoard);
    setFixedCells(newFixed);
    setSelectedCell(null);
  };

  useEffect(() => {
    if (settings) {
      generateBoardWithHoles();
    }
  }, [settings]);

  const selectCell = (row: number, col: number) => setSelectedCell({ row, col });

  const setCellValue = (row: number, col: number, value: CellValue) => {
    if (fixedCells[row][col]) return;
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  const resetBoard = () => {
    generateBoardWithHoles();
  };

  return {
    board,
    fixedCells,
    selectedCell,
    selectCell,
    setCellValue,
    resetBoard,
    size: settings.size,
    maxAttempts: settings.maxAttempts,
  };
};

