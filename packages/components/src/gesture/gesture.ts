import type { ITouchEvent, TouchEventFunction } from '@tarojs/components'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down'

export interface ISwipeEvent {
  horizontal?: boolean
  direction: SwipeDirection
  distance: number
}

export interface ITouchData {
  x: number
  y: number
  t: number
}

export function wrapTouch(handler: (data: ITouchData, evt: ITouchEvent) => void): TouchEventFunction {
  return (evt) => {
    const { touches, changedTouches } = evt
    const data = (touches?.length ? touches : changedTouches)?.at(0)
    if (data) {
      handler({ x: data.pageX, y: data.pageY, t: evt.timeStamp }, evt)
    }
  }
}

export function swipe(start: ITouchData, end: ITouchData) {
  const { x: x1, y: y1, t: t1 } = start
  const { x: x2, y: y2, t: t2 } = end

  const deltaX = Math.abs(x1 - x2)
  const deltaY = Math.abs(y1 - y2)

  if (deltaX > 80 || t2 - t1 < 250) {
    const direction: SwipeDirection = deltaX >= deltaY ? (x1 > x2 ? 'left' : 'right') : y1 > y2 ? 'up' : 'down'
    const horizontal = direction === 'left' || direction == 'right'
    const distance = horizontal ? deltaX : deltaY
    return { direction, horizontal, distance } satisfies ISwipeEvent
  }
}
