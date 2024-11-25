import { useCallback, useEffect, useRef } from "react";

interface UsePreservedCallbackProps {
  callback: () => void;
}

/**
 * @description
 * 해당 훅은 콜백 함수를 유지하는 훅입니다.
 * 콜백 함수가 변경되어도 이전 콜백 함수를 유지합니다.
 * 
 * const handleClick = usePreservedCallback({ callback: () => { 
 *  console.log('clicked');
 * }});
 * 
 * handleClick();
 */
const usePreservedCallback = ({ callback }: UsePreservedCallbackProps) => {
  const callbackRef = useRef<typeof callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<typeof callback>) => callbackRef.current?.(...args), [callbackRef]);
}

export default usePreservedCallback