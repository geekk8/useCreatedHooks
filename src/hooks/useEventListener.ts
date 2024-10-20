/**
 * @description
 * 해당되는 엘리먼트에 event listener를 관리하는 hook입니다.
    const divRef = useRef<HTMLDivElement | null>(null);
    const handleClick = () => {
      alert("Div clicked!");
    };

    useEventLisetener(divRef.current, "click", handleClick);
 * 
 */

import { useEffect } from "react";

export const useEventLisetener = (
  target: EventTarget | null | undefined,
  type: string,
  listener: EventListenerOrEventListenerObject,
  ...options: boolean[] | AddEventListenerOptions[]
): void => {
  useEffect(() => {
    const targetElement: EventTarget = target ?? window;

    if (!targetElement.addEventListener) return;

    targetElement.addEventListener(type, listener, ...options);

    return () => {
      targetElement.removeEventListener(type, listener, ...options);
    };
  }, [target, type, listener, options]);
};