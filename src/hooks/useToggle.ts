/**
 * toggle을 쉽게 사용할 수 있도록 하는 hook 입니다.
 * 
  const { toggle, onToggle, setToggle } = useToggle({ defaultToggle: false });

  <button onClick={onToggle}>
    {toggle ? 토글 오프 : 토글 온}
  </button>

  <button onClick={() => setToggle(true)}>
    토글 온
  </button>

  <button onClick={() => setToggle(false)}>
    토글 오프
  </button>
 */

import { useCallback, useState } from "react";

interface UseToggleProps {
  defaultToggle?: boolean;
}

const useToggle = ({ defaultToggle = false }: UseToggleProps) => {
  const [toggle, setToggle] = useState(!!defaultToggle);

  const handleToggle = useCallback(() => {
    setToggle((prevToggle) => !prevToggle);
  }, []);

  return {
    toggle,
    onToggle: handleToggle,
    setToggle,
  };
};

export default useToggle;
