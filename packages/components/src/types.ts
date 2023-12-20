export type AnyObject = Record<string, any>

export type ReactProps<T = {}> = {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & T
