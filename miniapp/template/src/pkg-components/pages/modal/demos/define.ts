type Demo<T, P = {}> = {
  title: string
  label?: string
  props: T
  snippet: string
} & P

export type DemoConfig<T, O = {}> = {
  title: string
  subtitle: string
  propType: string
  demos: Demo<T, O>[]
  invoke(demo: Demo<T, O>): any
}

export default function defineDemo<T, O>(v: DemoConfig<T, O>) {
  return v
}
