import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useOnClickOutside from '../hooks/useOnClickOutside';

describe('useOnClickOutside', () => {
  const handler = vi.fn();
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('지정된 요소 외부를 클릭했을 때 handler가 호출되어야 한다', () => {
    const ref = { current: container };
    const containsSpy = vi.spyOn(container, 'contains');
    containsSpy.mockReturnValue(false);
    
    renderHook(() => useOnClickOutside(ref, handler));

    const event = new MouseEvent('mousedown');
    document.dispatchEvent(event);

    expect(containsSpy).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('지정된 요소 내부를 클릭했을 때 handler가 호출되지 않아야 한다', () => {
    const ref = { current: container };
    
    const mockTarget = document.createElement('div');
    container.appendChild(mockTarget);
    
    renderHook(() => useOnClickOutside(ref, handler));

    const event = new MouseEvent('mousedown');
    mockTarget.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it('ref가 null일 때 handler가 호출되지 않아야 한다', () => {
    const ref = { current: null };
    const mockTarget = document.createElement('div');
    document.body.appendChild(mockTarget);
    
    renderHook(() => useOnClickOutside(ref, handler));

    const event = new MouseEvent('mousedown');
    mockTarget.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    
    document.body.removeChild(mockTarget);
  });
});
