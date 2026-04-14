import type { ReactNode } from "react";
import styles from "./GameBoard.module.css";

type GameBoardProps = {
  children: ReactNode[][];
  size: number;
};

const GameBoard = ({ children, size }: GameBoardProps) => {
  const sqrt = Math.sqrt(size);

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {children.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const cellClasses = [styles.cellWrapper];

          if ((colIndex + 1) % sqrt === 0 && colIndex !== size - 1) {
            cellClasses.push(styles.borderRight);
          }
          if ((rowIndex + 1) % sqrt === 0 && rowIndex !== size - 1) {
            cellClasses.push(styles.borderBottom);
          }

          return (
            <div key={`${rowIndex}-${colIndex}`} className={cellClasses.join(" ")}>
              {cell}
            </div>
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
