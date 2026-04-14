import { useState } from 'react';
import type { DifficultySettings } from './useSettings';

export type CellValue = number | null;
export type Board = CellValue[][];

// Порожнє поле
const emptyBoard = (size: number): Board =>
  Array.from({ length: size }, () => Array(size).fill(null));

// Генеруємо заповнене поле (проста формула, щоб не зависало)
const generateFullBoard = (size: number): Board => {
  const board: Board = emptyBoard(size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      board[row][col] = ((row + col) % size) + 1;
    }
  }
  return board;
};

// Основний хук useGame
export const useGame = (settings: DifficultySettings) => {
  const removeCount = Math.floor(settings.size * settings.size * 0.6);

  // Генеруємо початкове поле
  const fullBoard = generateFullBoard(settings.size);
  const boardWithHoles: Board = fullBoard.map(r => [...r]);
  const fixed: boolean[][] = fullBoard.map(r => r.map(() => true));

  let removed = 0;
  while (removed < removeCount) {
    const row = Math.floor(Math.random() * settings.size);
    const col = Math.floor(Math.random() * settings.size);
    if (boardWithHoles[row][col] !== null) {
      boardWithHoles[row][col] = null;
      fixed[row][col] = false;
      removed++;
    }
  }

  const [board, setBoard] = useState<CellValue[][]>(boardWithHoles);
  const [fixedCells, setFixedCells] = useState<boolean[][]>(fixed);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Вибір клітинки
  const selectCell = (row: number, col: number) => setSelectedCell({ row, col });

  // Встановлення значення в клітинку
  const setCellValue = (row: number, col: number, value: CellValue) => {
    if (fixedCells[row][col]) return;
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  // Перезапуск гри
  const resetBoard = () => {
    const full = generateFullBoard(settings.size);
    const newBoard: Board = full.map(r => [...r]);
    const newFixed: boolean[][] = full.map(r => r.map(() => true));

    let removedCells = 0;
    while (removedCells < removeCount) {
      const row = Math.floor(Math.random() * settings.size);
      const col = Math.floor(Math.random() * settings.size);
      if (newBoard[row][col] !== null) {
        newBoard[row][col] = null;
        newFixed[row][col] = false;
        removedCells++;
      }
    }

    setBoard(newBoard);
    setFixedCells(newFixed);
    setSelectedCell(null);
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
