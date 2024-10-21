import { useEffect, useRef } from "react";

interface UseTimeoutProps {
  callback: () => void;
  delay: number | null;
}

/**
 * @description
 * 해당 훅은 주어진 callback 함수를 지정된 delay 후에 실행하는 타이머 기능을 제공하는 커스텀 훅입니다.
 * useTimeout({
    callback: () => setMessage('Timeout completed!'),
    delay: 3000, // 3초 후에 콜백 실행
  });
 */

export function useTimeout({ callback, delay }: UseTimeoutProps) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    if (!delay || delay !== 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);
}

export default useTimeout;
