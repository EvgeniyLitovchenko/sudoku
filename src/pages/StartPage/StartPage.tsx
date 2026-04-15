import { useNavigate } from 'react-router-dom';
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from './StartPage.module.css';

/**
 * Компонент StartPage для відображення головної сторінки гри в судоку з кнопками для початку гри, налаштувань та перегляду результатів.
 * @returns {any}
 */
const StartPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className={styles.startContainer}>
        <h1 className={styles.title}>Sudoku</h1>
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={() => navigate('/game')}>
            Start Game
          </button>
          <button className={styles.button} onClick={() => navigate('/settings')}>
            Settings
          </button>
          <button className={styles.button} onClick={() => navigate('/results')}>
            Results
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default StartPage;
