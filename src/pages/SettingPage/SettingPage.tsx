import React, { useEffect } from 'react';
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from './SettingPage.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

type FormValues = {
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

const schema = yup.object({
  difficulty: yup.string().oneOf(['Easy', 'Medium', 'Hard']).required(),
}).required();

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const { setValue, watch, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { difficulty: 'Easy' },
  });

  const difficulty = watch('difficulty');

  useEffect(() => {
    const saved = localStorage.getItem('sudokuDifficulty') as FormValues['difficulty'] | null;
    if (saved) {
      setValue('difficulty', saved);
    }
  }, [setValue]);

  const onSubmit = (data: FormValues) => {
    localStorage.setItem('sudokuDifficulty', data.difficulty);
    navigate('/');
  };

  return (
    <PageLayout>
      <div className={styles.container}>
        <h1>Settings</h1>

        <div className={styles.section}>
          <h2>Select Difficulty</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.buttonsContainer}>
              {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setValue('difficulty', level)}
                  className={`${styles.button} ${
                    difficulty === level ? styles.activeButton : ''
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <button type="submit" className={styles.button}>
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
