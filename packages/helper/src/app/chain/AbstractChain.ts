export type ChainInstance<ParentChain extends AbstractChain, Chain extends AbstractChain> = Chain & {
  end: () => ParentChain
}

export default abstract class AbstractChain {
  protected readonly platform = process.env.TARO_ENV

  protected chain<ParentChain extends AbstractChain, Chain extends AbstractChain>(
    this: ParentChain,
    chain: Chain,
  ): ChainInstance<ParentChain, Chain> {
    return Object.assign(chain, { end: () => this })
  }

  abstract get(): any
}
