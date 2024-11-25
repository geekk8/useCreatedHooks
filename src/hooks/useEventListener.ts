import { useEffect } from "react";

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
export function useEventLisetener(
  target: EventTarget | null | undefined,
  type: string,
  listener: EventListenerOrEventListenerObject,
  ...options: boolean[] | AddEventListenerOptions[]
) {
  useEffect(() => {
    const targetElement: EventTarget = target ?? window;

    if (!targetElement.addEventListener) return;

    targetElement.addEventListener(type, listener, ...options);

    return () => {
      targetElement.removeEventListener(type, listener, ...options);
    };
  }, [target, type, listener, options]);
}
