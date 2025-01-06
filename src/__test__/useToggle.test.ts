import useToggle from "../hooks/useToggle";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe('useToggle', () => {
  it('toggle 함수 초기값은 false이다', () => {
    const { result } = renderHook(() => useToggle({defaultToggle: false}));
    expect(result.current.toggle).toBe(false);
  })

  it('toggle 함수 초기값은 true이다', () => {
    const { result } = renderHook(() => useToggle({defaultToggle: true}));
    expect(result.current.toggle).toBe(true);
  })

  it('toggle 함수는 토글 상태를 반전 시킨다', () => {
    const { result } = renderHook(() => useToggle({defaultToggle: false}));
    act(() => result.current.onToggle())
    expect(result.current.toggle).toBe(true)
  })

  it('setToggle 함수는 토글 상태를 설정한다', () => {
    const { result } = renderHook(() => useToggle({defaultToggle: false}));
    act(() => result.current.setToggle(true))
    expect(result.current.toggle).toBe(true)
  })
})