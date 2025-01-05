import useTimeout from "../hooks/useTimeout";
import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('delay가 0이 아니면 콜백이 즉시 실행되지 않습니다', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout({ callback, delay: 1000 }));
    expect(callback).not.toHaveBeenCalled();
  });

  it('delay 시간이 지나면 콜백이 실행됩니다', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout({ callback, delay: 1000 }));
    
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  it('delay가 0이면 콜백이 즉시 실행됩니다', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout({ callback, delay: 0 }));
    vi.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
})