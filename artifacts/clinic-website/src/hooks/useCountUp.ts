import { useEffect, useState, useRef, useCallback } from 'react';

export const useCountUp = (endValue: number, duration: number = 2000, decimals: number = 0): number => {
  const [count, setCount] = useState<number>(0);
  const rafRef = useRef<number | undefined>(undefined);

  const startTimeRef = useRef<number | undefined>(undefined);


  const animate = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const elapsed = performance.now() - (startTimeRef.current ?? 0);
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutQuad)
    const easeProgress = 1 - (1 - progress) ** 2;
    
    const value = Number((endValue * easeProgress).toFixed(decimals));
    
    setCount(value);
    
    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [endValue, duration, decimals]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return count;
};

