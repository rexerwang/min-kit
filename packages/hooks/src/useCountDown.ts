/**
 * Fork from https://github.com/alibaba/hooks/blob/v3.7.8/packages/hooks/src/useCountDown/index.ts
 * @license https://github.com/alibaba/hooks/blob/v3.7.8/LICENSE
 */

import { useEffect, useMemo, useState } from 'react'

import { useLatest } from './useLatest'

export type TDate = Date | number | undefined

export interface Options {
  /** ms */
  leftTime?: number
  targetDate?: Date
  /** @default 1000 */
  interval?: number
  onEnd?: () => void
}

export interface FormattedRes {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

const calcLeft = (target?: TDate) => {
  if (!target) {
    return 0
  }
  const left = +target - Date.now()
  return left < 0 ? 0 : left
}

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  }
}

export function useCountdown(options: Options = {}) {
  const { leftTime, targetDate, interval = 1000, onEnd } = options

  const target = useMemo<TDate>(
    () => (leftTime && leftTime > 0 ? Date.now() + leftTime : targetDate),
    [leftTime, targetDate],
  )

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target))

  const onEndRef = useLatest(onEnd)

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0)
      return
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target))

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target)
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)
        onEndRef.current?.()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, interval])

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft])

  return [timeLeft, formattedRes] as const
}
