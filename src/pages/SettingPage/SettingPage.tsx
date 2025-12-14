import React, { useState } from 'react';
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from './SettingPage.module.css';

const SettingsPage: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  const handleDifficultyChange = (level: 'Easy' | 'Medium' | 'Hard') => {
    setDifficulty(level);
  };

  return (
    <PageLayout>
      <div className={styles.container}>
        <h1>Settings</h1>
        <div className={styles.section}>
          <h2>Select Difficulty</h2>
          <div className={styles.buttonsContainer}>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                onClick={() => handleDifficultyChange(level as 'Easy' | 'Medium' | 'Hard')}
                className={`${styles.button} ${difficulty === level ? styles.activeButton : ''}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;

