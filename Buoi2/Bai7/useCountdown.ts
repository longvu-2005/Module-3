import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownOptions {
  initialSeconds: number;
  onTimerEnd?: () => void;
}

interface UseCountdownReturn {
  seconds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export const useCountdown = ({
  initialSeconds,
  onTimerEnd,
}: UseCountdownOptions): UseCountdownReturn => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  

  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const onTimerEndRef = useRef(onTimerEnd);
  useEffect(() => {
    onTimerEndRef.current = onTimerEnd;
  }, [onTimerEnd]);


  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

 
  const start = useCallback(() => {
    if (!isRunning && seconds > 0) {
      setIsRunning(true);
    }
  }, [isRunning, seconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds, clearTimer]);

 
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearTimer();
            setIsRunning(false);
            if (onTimerEndRef.current) {
              onTimerEndRef.current();
            }
            return 0; // Tự động ngắt tại mốc 0
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

   
    return () => {
      clearTimer();
    };
  }, [isRunning, clearTimer]);

  return { seconds, isRunning, start, pause, reset };
};