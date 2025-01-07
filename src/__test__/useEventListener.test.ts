import { useEventLisetener } from "../hooks/useEventListener";
import { fireEvent, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe('useEventListener', () => {
  it('해당되는 element가 없다면 아무것도 하지 않는다', () => {
    const callback = vi.fn()
    renderHook(() => useEventLisetener(null, 'click', callback))

    expect(callback).not.toHaveBeenCalled()
  })

  it('해당되는 element가 있고, 이벤트가 발생하면 콜백이 실행된다', () => {
    const callback = vi.fn()
    const { rerender } = renderHook(() => useEventLisetener(document.body, 'click', callback))

    fireEvent.click(document.body)
    expect(callback).toHaveBeenCalledTimes(1)

    rerender()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('cleanup 시 이벤트 리스너가 제거된다', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() => 
      useEventLisetener(document.body, 'click', callback)
    )

    unmount()
    fireEvent.click(document.body)
    expect(callback).not.toHaveBeenCalled()
  })

  it('여러 이벤트 타입에 대해 동작한다', () => {
    const callback = vi.fn()
    renderHook(() => useEventLisetener(document.body, 'keydown', callback))

    fireEvent.keyDown(document.body, { key: 'Enter' })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('callback이 변경되어도 이벤트 리스너가 정상 동작한다', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    
    const { rerender } = renderHook(
      ({ cb }) => useEventLisetener(document.body, 'click', cb),
      { initialProps: { cb: callback1 } }
    )

    fireEvent.click(document.body)
    expect(callback1).toHaveBeenCalledTimes(1)

    rerender({ cb: callback2 })
    
    fireEvent.click(document.body)
    expect(callback1).toHaveBeenCalledTimes(1)  // 이전 콜백은 더 이상 호출되지 않음
    expect(callback2).toHaveBeenCalledTimes(1)  // 새 콜백이 호출됨
  })
})