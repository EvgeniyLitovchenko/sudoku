import { useState, useEffect } from "react";
import type { Board } from "./useGame";

export type CheckResult = "win" | "lose" | "continue";

export const useCheckAnswer = (maxAttempts: number | null) => {
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(maxAttempts);

  useEffect(() => {
    setAttemptsLeft(maxAttempts);
  }, [maxAttempts]);

  const checkAnswer = (board: Board): CheckResult => {
    const size = board.length;
    const boxSize = Math.sqrt(size);

    for (let row = 0; row < size; row++) {
      const seen = new Set<number>();
      for (let col = 0; col < size; col++) {
        const val = board[row][col];
        if (!val || val < 1 || val > size || seen.has(val)) return handleWrong();
        seen.add(val);
      }
    }

    for (let col = 0; col < size; col++) {
      const seen = new Set<number>();
      for (let row = 0; row < size; row++) {
        const val = board[row][col];
        if (!val || val < 1 || val > size || seen.has(val)) return handleWrong();
        seen.add(val);
      }
    }

    for (let boxRow = 0; boxRow < boxSize; boxRow++) {
      for (let boxCol = 0; boxCol < boxSize; boxCol++) {
        const seen = new Set<number>();
        for (let r = 0; r < boxSize; r++) {
          for (let c = 0; c < boxSize; c++) {
            const val = board[boxRow * boxSize + r][boxCol * boxSize + c];
            if (!val || val < 1 || val > size || seen.has(val)) return handleWrong();
            seen.add(val);
          }
        }
      }
    }

    return "win";
  };

  const handleWrong = (): CheckResult => {
    if (attemptsLeft === null) return "continue";
    if (attemptsLeft <= 1) {
      setAttemptsLeft(0);
      return "lose";
    }
    setAttemptsLeft(prev => (prev as number) - 1);
    return "continue";
  };

  const resetAttempts = () => setAttemptsLeft(maxAttempts);

  return { attemptsLeft, checkAnswer, resetAttempts };
};
