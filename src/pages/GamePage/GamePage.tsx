import PageLayout from "../../components/PageLayout/PageLayout";
import GameBoard from "../../components/GameBoard/GameBoard";
import SudokuCell from "../../components/SudokuCell/SudokuCell";
import GameTimer from "../../components/GameTimer/GameTimer";

import styles from "./GamePage.module.css";

import { useSettings } from "../../hooks/useSettings";
import { useGame } from "../../hooks/useGame";
import { useCheckAnswer } from "../../hooks/useCheckAnswer";
import { useTimer } from "../../hooks/useTimer";
import { useFixResult } from '../../hooks/useFixResult';

const GamePage = () => {
  const { currentSettings } = useSettings();
  const { board, fixedCells, selectedCell, selectCell, setCellValue, resetBoard, size, maxAttempts } = useGame(currentSettings);
  const { attemptsLeft, checkAnswer, setAttemptsLeft } = useCheckAnswer();
  const { seconds, reset: resetTimer } = useTimer(true);

  const { saveResult } = useFixResult();

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
    if (maxAttempts === null) {
      const result = checkAnswer(board, maxAttempts);
      if (result) {
        saveResult({ difficulty: currentSettings.size.toString(), time: seconds, win: true, date: new Date().toISOString() });
        alert(`Вітаю! Ви завершили гру за ${seconds} секунд`);
        resetBoard();
        resetTimer();
      } else {
        alert(`Неправильна відповідь! Спроб не обмежено.`);
      }
    } else {
      const result = checkAnswer(board, maxAttempts);
      if (result) {
        saveResult({ difficulty: currentSettings.size.toString(), time: seconds, win: true, date: new Date().toISOString() });
        alert(`Вітаю! Ви завершили гру за ${seconds} секунд`);
        resetBoard();
        resetTimer();
        setAttemptsLeft(maxAttempts);
      } else if (attemptsLeft === 0) {
        saveResult({ difficulty: currentSettings.size.toString(), time: seconds, win: false, date: new Date().toISOString() });
        alert('Спроби закінчились! Гру перезапущено.');
        resetBoard();
        resetTimer();
        setAttemptsLeft(maxAttempts);
      } else {
        alert(`Неправильна відповідь! Спроб залишилось: ${attemptsLeft}`);
      }
    }
  };


  return (
    <PageLayout>
      <GameTimer time={new Date(seconds * 1000).toISOString().substr(14, 5)} />
      <GameBoard size={size}>
        {board.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue !== null ? cellValue.toString() : ""}
                variant={fixedCells[rowIndex][colIndex] ? "fixed" : "editable"}
                onClick={() => selectCell(rowIndex, colIndex)}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                isSelected={isSelected}
              />
            );
          })
        )}
      </GameBoard>
      <button className={styles.checkBtn} onClick={handleCheck}>Check</button>
    </PageLayout>
  );
};

export default GamePage;
