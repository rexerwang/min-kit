import AbstractChain from './AbstractChain'
import SubPackageChain from './SubPackageChain'
import { WechatChain } from './WechatChain'

export default class ConfigChain extends AbstractChain {
  private config: Taro.Config = {}
  private subPackages: SubPackageChain[] = []
  private wechatChain = new WechatChain(this.config)

  get() {
    if (!this.config.pages?.length) throw new Error('请调用`.pages()`设置`pages`项')

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

  customNavigationStyle() {
    return this.window({ navigationStyle: 'custom' })
  }

  subPackage(this: ConfigChain, id: string) {
    const subPackage = new SubPackageChain(id)
    this.subPackages.push(subPackage)

    return Object.assign(subPackage, { end: () => this })
  }

  /** 微信私有配置项 */
  get wechat(): WechatChain & { end(): ConfigChain } {
    return Object.assign(this.wechatChain, { end: () => this })
  }
}
