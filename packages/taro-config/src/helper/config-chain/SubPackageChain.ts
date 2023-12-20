import AbstractChain from './AbstractChain'
import PluginChain from './PluginChain'

export default class SubPackageChain extends AbstractChain {
  private subPackage: Taro.SubPackage
  private condition = true
  private plugins: PluginChain[] = []

  constructor(name: string) {
    super()
    this.subPackage = { root: name, name, pages: [], plugins: {} }
  }

  get() {
    if (this.subPackage.pages.length) {
      if (this.platform === 'weapp') this.subPackage.plugins = PluginChain.gets(this.plugins)
      return this.subPackage
    }
  }

  static gets(subPackages: SubPackageChain[]) {
    return subPackages.map((subPackage) => subPackage.get()).filter(Boolean) as Taro.SubPackage[]
  }

  when(condition: boolean) {
    this.condition = condition
    return this
  }

  pages(pages: string[]) {
    if (this.condition) {
      this.subPackage.pages = pages
    }

    return this
  }

  plugin(id: string): PluginChain & { end: () => SubPackageChain } {
    const plugin = new PluginChain(id)
    this.plugins.push(plugin)

    return Object.assign(plugin, { end: () => this })
  }
}
