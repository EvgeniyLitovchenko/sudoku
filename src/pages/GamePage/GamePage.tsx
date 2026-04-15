import { useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import GameBoard from "../../components/GameBoard/GameBoard";
import SudokuCell from "../../components/SudokuCell/SudokuCell";
import GameTimer from "../../components/GameTimer/GameTimer";
import GameResultModal from "../../components/GameResultModal/GameResultModal";

import styles from "./GamePage.module.css";

import { useSettings } from "../../hooks/useSettings";
import { useGame } from "../../hooks/useGame";
import { useCheckAnswer } from "../../hooks/useCheckAnswer";
import { useTimer } from "../../hooks/useTimer";
import { useFixResult } from "../../hooks/useFixResult";

/**
 * Компонент GamePage для відображення основної сторінки гри в судоку, включаючи ігрове поле, таймер та модальне вікно результатів.
 * @returns {any}
 */
const GamePage = () => {
  const { currentSettings } = useSettings();
  if (!currentSettings) return null;

  const {
    board,
    fixedCells,
    selectedCell,
    selectCell,
    setCellValue,
    resetBoard,
    size,
    maxAttempts,
  } = useGame(currentSettings);

  const { attemptsLeft, checkAnswer, resetAttempts } = useCheckAnswer(maxAttempts);
  const { seconds, reset: resetTimer } = useTimer(true);
  const { saveResult } = useFixResult();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<"win" | "lose" | "continue">("continue");

  const handleChange = (row: number, col: number, value: string) => {
    if (value === "") {
      setCellValue(row, col, null);
      return;
    }
    const numericValue = Number(value);
    if (numericValue >= 1 && numericValue <= size) {
      setCellValue(row, col, numericValue);
    }
  };

  const handleCheck = () => {
    const result = checkAnswer(board);
    setModalState(result);
    setIsModalOpen(true);

    if (result === "win") {
      saveResult({
        difficulty: currentSettings.size.toString(),
        time: seconds,
        win: true,
        date: new Date().toISOString(),
      });
    } else if (result === "lose") {
      saveResult({
        difficulty: currentSettings.size.toString(),
        time: seconds,
        win: false,
        date: new Date().toISOString(),
      });
    }
  };

  const handleRestart = () => {
    resetBoard();
    resetTimer();
    resetAttempts();
    setIsModalOpen(false);
  };

  return (
    <PageLayout>
      <GameTimer time={new Date(seconds * 1000).toISOString().substr(14, 5)} />

      <GameBoard size={size}>
        {board.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const isSelected =
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue !== null ? cellValue.toString() : ""}
                variant={fixedCells[rowIndex][colIndex] ? "fixed" : "editable"}
                onClick={() => selectCell(rowIndex, colIndex)}
                onChange={e => handleChange(rowIndex, colIndex, e.target.value)}
                isSelected={isSelected}
              />
            );
          })
        )}
      </GameBoard>

      <button className={styles.checkBtn} onClick={handleCheck}>
        Check
      </button>

      <GameResultModal
        isOpen={isModalOpen}
        win={modalState === "win"}
        time={seconds}
        difficulty={currentSettings.size.toString()}
        attemptsLeft={attemptsLeft}
        onRestart={handleRestart}
        onNext={handleRestart}
        onContinue={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
};

export default GamePage;
