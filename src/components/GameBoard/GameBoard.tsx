import type { ReactNode } from "react";
import styles from "./GameBoard.module.css";

type GameBoardProps = {
  children: ReactNode;
  size: number;
};

const GameBoard = ({ children, size }: GameBoardProps) => {
  return (
    <div
      className={styles.board}
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {children}
    </div>
  );
};

export default GameBoard;
