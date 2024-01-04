import AbstractChain from './AbstractChain'
import PluginChain from './PluginChain'

export default class SubPackageChain extends AbstractChain {
  private subPackage: Taro.SubPackage
  private plugins: PluginChain[] = []

  constructor(name: string) {
    super()
    this.subPackage = { root: name, name, pages: [], plugins: {} }
  }

  get(): Taro.SubPackage | undefined {
    if (this.subPackage.pages.length) {
      if (this.platform === 'weapp') this.subPackage.plugins = PluginChain.gets(this.plugins)
      return this.subPackage
    }
  }

  static gets(subPackages: SubPackageChain[]): Taro.SubPackage[] {
    return subPackages.map((subPackage) => subPackage.get()).filter(Boolean) as Taro.SubPackage[]
  }

  pages(pages: string[]) {
    this.subPackage.pages = pages
    return this
  }

  /**
   * add plugin into subPackage
   * @supported weapp
   */
  plugin(...args: ConstructorParameters<typeof PluginChain>) {
    const plugin = new PluginChain(...args)
    this.plugins.push(plugin)

    return this
  }
}
