import AbstractChain from './AbstractChain'
import PluginChain from './PluginChain'

export class WechatChain extends AbstractChain {
  private enabled = this.platform === 'weapp'

  constructor(
    private config: Taro.Config,
    private plugins: PluginChain[] = [],
  ) {
    super()
  }

  get() {
    if (this.enabled) {
      this.config.plugins = PluginChain.gets(this.plugins)
    }
  }

  plugin(id: string) {
    const plugin = new PluginChain(id)
    if (this.enabled) this.plugins.push(plugin)

    return this.assign(plugin)
  }

  darkMode() {
    if (this.enabled) this.config.darkmode = true

    return this
  }

  debug(enable: boolean) {
    if (this.enabled) this.config.debug = enable

    return this
  }

  /**
   * 目前仅支持 位置相关权限声明
   * @since wechat v7.0.0
   * @see https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission
   */
  permission(desc: string) {
    if (this.enabled) this.config.permission = { 'scope.userLocation': { desc } }

    return this
  }

  /**
   * 调用的地理位置相关隐私接口
   * @since 2022.07.14
   * @see https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredPrivateInfos
   */
  requiredPrivateInfos(requires: NonNullable<Taro.Config['requiredPrivateInfos']>) {
    if (this.enabled) this.config.requiredPrivateInfos = requires

    return this
  }

  /**
   * 申明需要后台运行的能力
   * @since wechat v6.7.2
   * @see https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredBackgroundModes
   */
  requiredBackgroundModes(requires: NonNullable<Taro.Config['requiredBackgroundModes']>) {
    if (this.enabled) this.config.requiredBackgroundModes = requires

    return this
  }

  /**
   * 启用 Skyline 渲染引擎
   *
   * @since 微信安卓客户端 8.0.33 或以上版本（对应基础库为 2.30.4 或以上版本）
   * @since 微信 iOS 客户端 8.0.34 或以上版本（对应基础库为 2.31.1 或以上版本）
   * @since 开发者工具 Stable 1.06.2307260 或以上版本（建议使用 Nightly 最新版）
   *
   * @see https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/introduction.html
   * @see https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/migration/
   */
  skyline(options: Taro.RenderOptions['skyline'] = { defaultDisplayBlock: true }) {
    if (this.enabled) {
      this.config.renderer = 'skyline'
      this.config.lazyCodeLoading = 'requiredComponents'
      this.config.componentFramework = 'glass-easel'
      if (options) this.config.rendererOptions = { skyline: options }

      if (!this.config.window) this.config.window = {}
      Object.assign(this.config.window, { navigationStyle: 'custom' })
    }

    return this
  }
}
