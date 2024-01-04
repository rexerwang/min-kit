import AbstractChain from './AbstractChain'

type Plugin = { id: string; version: string; provider: string }

export default class PluginChain extends AbstractChain {
  private plugin: Plugin

  constructor(id: string, plugin: Omit<Plugin, 'id'>) {
    super()
    this.plugin = { id, ...plugin } as Plugin
  }

  get() {
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
}
