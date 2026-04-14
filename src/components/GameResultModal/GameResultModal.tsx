import Modal from "../Modal/Modal";
import styles from "./GameResultModal.module.css";

type Props = {
  isOpen: boolean;
  win: boolean;
  time: number;
  difficulty: string;
  attemptsLeft: number | null;
  onRestart: () => void;
  onNext: () => void;
  onContinue: () => void; // новий callback для "continue"
};

const GameResultModal = ({
  isOpen,
  win,
  time,
  difficulty,
  attemptsLeft,
  onRestart,
  onNext,
  onContinue,
}: Props) => {
  // Визначаємо стан модалки
  const isLose = !win && attemptsLeft === 0;
  const isContinue = !win && attemptsLeft !== null && attemptsLeft > 0;

  return (
    <Modal isOpen={isOpen} onClose={onRestart}>
      <h2 className={win ? styles.win : isLose ? styles.lose : styles.continue}>
        {win ? "🎉 Ви перемогли!" : isLose ? "❌ Ви програли" : "⚠️ Неправильна відповідь"}
      </h2>

      <p>
        Складність: <b>{difficulty}</b>
      </p>

      <p>
        Час: <b>{new Date(time * 1000).toISOString().substr(14, 5)}</b>
      </p>

      {isLose && (
        <p className={styles.attempts}>
          Спроби закінчились
        </p>
      )}

      {isContinue && (
        <p className={styles.attempts}>
          Неправильна відповідь! Залишилось спроб: <b>{attemptsLeft}</b>
        </p>
      )}

      <div className={styles.actions}>
        <button onClick={onRestart}>🔁 Заново</button>
        {win && <button onClick={onNext}>▶️ Наступна гра</button>}
        {isContinue && <button onClick={onContinue}>➡️ Продовжити гру</button>}
      </div>
    </Modal>
  );
};

export default GameResultModal;
