import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import usePreservedCallback from '../hooks/usePreservedCallback';

describe('usePreservedCallback', () => {
  it('콜백 함수가 보존되어야 한다', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() => usePreservedCallback({ callback }));

    const firstCallback = result.current
    rerender();
    const secondCallback = result.current;

    expect(firstCallback).toBe(secondCallback);
  });

  it('의존성이 변경되면 새로운 콜백이 생성되어야 한다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePreservedCallback({ callback: () => value }),
      { initialProps: { value: 1 } }
    )

    const firstCallback = result.current;
    expect(firstCallback()).toBe(1)

    rerender({ value:2});
    const secondCallback = result.current;
    expect(secondCallback()).toBe(2);
  })
});
