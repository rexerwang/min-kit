export default abstract class AbstractChain {
  protected readonly platform = process.env.TARO_ENV

  protected assign<T extends object>(chain: T): T & { end: () => AbstractChain } {
    return Object.assign(chain, { end: () => this })
  }

  abstract get(): any
}
