import { cloneElement, useRef } from 'react'

import { type ISwipeEvent, type ITouchData, swipe, wrapTouch } from './gesture'

type EventHandler<T> = (e: T) => void

export interface GestureProps {
  children: React.ReactElement
  onSwipe?: EventHandler<ISwipeEvent>
}

export function Gesture({ children, onSwipe }: GestureProps) {
  const startData = useRef<ITouchData>()

  const onTouchStart = wrapTouch((data) => {
    startData.current = data
  })

  const onTouchEnd = wrapTouch((data) => {
    if (startData.current && data) {
      const event = swipe(startData.current, data)
      event && onSwipe?.(event)
    }
  })

  return cloneElement(children, {
    onTouchStart,
    onTouchEnd,
  })
}

Gesture.displayName = 'MinGesture'

export type { ISwipeEvent } from './gesture'
