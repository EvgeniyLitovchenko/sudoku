import { useState, useEffect, useRef } from 'react';

/**
 * Хук useTimer для відстеження часу гри в судоку.
 * @param {any} start:boolean=false
 * @returns {any}
 */
export const useTimer = (start: boolean = false) => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (start) {
      timerRef.current = window.setInterval(() => setSeconds(prev => prev + 1), 1000);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [start]);

  const reset = () => setSeconds(0);

  return { seconds, reset };
};
