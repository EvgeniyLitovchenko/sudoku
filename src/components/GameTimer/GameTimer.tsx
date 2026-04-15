import styles from "./GameTimer.module.css";

type GameTimerProps = {
  time?: string;
};

/**
 * Компонент GameTimer для відображення таймера гри.
 * @param {any} {time="00:00"}:GameTimerProps
 * @returns {any}
 */
const GameTimer = ({ time = "00:00" }: GameTimerProps) => {
  return (
    <div className={styles.timer}>
      <span className={styles.label}>Time</span>
      <span className={styles.value}>{time}</span>
    </div>
  );
};

export default GameTimer;
