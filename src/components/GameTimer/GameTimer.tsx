import styles from "./GameTimer.module.css";

type GameTimerProps = {
  time?: string;
};

const GameTimer = ({ time = "00:00" }: GameTimerProps) => {
  return (
    <div className={styles.timer}>
      <span className={styles.label}>Time</span>
      <span className={styles.value}>{time}</span>
    </div>
  );
};

export default GameTimer;
