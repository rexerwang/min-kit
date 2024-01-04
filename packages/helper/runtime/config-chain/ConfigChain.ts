import AbstractChain from './AbstractChain'
import SubPackageChain from './SubPackageChain'
import { WeChatChain } from './WeChatChain'

export default class ConfigChain extends AbstractChain {
  private config: Taro.Config = {}
  private subPackages: SubPackageChain[] = []
  private wechatChain = new WeChatChain(this.config)

  get(): Taro.Config {
    if (!this.config.pages?.length) throw new Error('Please set pages via `chain.pages()`')

    this.wechatChain.get()
    this.config.subPackages = SubPackageChain.gets(this.subPackages)

    return this.config
  }

  pages(pages: string[]) {
    this.config.pages = pages
    return this
  }

  entryPagePath(path: string) {
    this.config.entryPagePath = path
    return this
  }

  window(config: Taro.WindowConfig) {
    if (!this.config.window) this.config.window = {}
    Object.assign(this.config.window, config)
    return this
  }

  tabBar(tabBar: Taro.TabBar) {
    this.config.tabBar = tabBar
    return this
  }

  subPackage(id: string) {
    const subPackage = new SubPackageChain(id)
    this.subPackages.push(subPackage)

    return this.chain(subPackage)
  }

  /** 微信私有配置项 */
  get wechat() {
    return this.chain(this.wechatChain)
  }
}
