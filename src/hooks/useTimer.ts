import { useState, useEffect, useRef } from 'react';

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
