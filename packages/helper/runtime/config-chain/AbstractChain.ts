export default abstract class AbstractChain {
  protected readonly platform = process.env.TARO_ENV

  abstract get(): any
}
