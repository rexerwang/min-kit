import AbstractChain from './AbstractChain'

type Plugin = { id: string; version: string; provider: string }

export default class PluginChain extends AbstractChain {
  private plugin: Plugin
  private condition = true

  constructor(id: string) {
    super()
    this.plugin = { id } as Plugin
  }

  get() {
    if (!this.plugin.provider) throw new Error('请调用`.provide()`设置`plugin.provider`项')
    if (!this.plugin.version) throw new Error('请调用`.version()`设置`plugin.version`项')
    return this.plugin
  }

  static gets(plugins: PluginChain[]): Taro.Plugins {
    return plugins
      .map((plugin) => plugin.get())
      .reduce((map, { id, ...plugin }) => {
        map[id] = plugin
        return map
      }, {} as Taro.Plugins)
  }

  when(condition: boolean) {
    this.condition = condition
    return this
  }

  provide(provider: string) {
    if (this.condition) {
      this.plugin.provider = provider
    }

    return this
  }

  version(version: string) {
    if (this.condition) {
      this.plugin.version = version
    }

    return this
  }
}
