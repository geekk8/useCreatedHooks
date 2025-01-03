import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('localStorage에 이미 값이 있는 경우 해당 값을 사용하는지 테스트', () => {
    localStorage.setItem('testKey', JSON.stringify('existingValue'));

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'testKey', initialValue: 'initialValue' })
    );

    const [value] = result.current;
    expect(value).toBe('existingValue');
  });

  it('setValue를 통해 값이 정상적으로 업데이트되는지 테스트', () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'testKey', initialValue: 'initialValue' })
    );

    act(() => {
      const setValue = result.current[1];
      setValue('newValue');
    });

    const [value] = result.current;
    expect(value).toBe('newValue');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('객체 타입의 값도 정상적으로 저장됨', () => {
    const testObject = { name: 'test', value: 123 };
    
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'testKey', initialValue: {} })
    );

    act(() => {
      result.current[1](testObject);
    });

    expect(localStorage.getItem('testKey')).toEqual(JSON.stringify(testObject));
  });
});
