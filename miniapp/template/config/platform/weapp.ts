import type { UserConfig } from '@min-kit/helper/compile'

/** 微信小程序配置 */
export default ((appid) => ({
  project: {
    output: 'project.config.json',
    miniprogramRoot: 'dist',
    projectname: '@min-kit/template',
    description: '@min-kit/template',
    appid,
    setting: {
      es6: true, // 预览时需要开启
      urlCheck: false,
      bigPackageSizeSupport: true,
      compileHotReLoad: false,
    },
    compileType: 'miniprogram',
    libVersion: '3.1.2',
    srcMiniprogramRoot: 'dist/',
    packOptions: {
      ignore: [],
      include: [],
    },
  },
  ci: {
    appid,
    privateKeyPath: process.env[`CI_PRIVATE_KEY_${appid}`] || `.private.key.${appid}`,
    /** 指定使用哪一个 ci 机器人，可选值：1 ~ 30 */
    robot: Number(process.env.CI_MINI_ROBOT) || 1,
    setting: {
      /** 对应于微信开发者工具的 "es6 转 es5" */
      es6: false,
      /** 对应于微信开发者工具的 "增强编译" */
      es7: false,
      /** "增强编译" 开启时，是否禁用JS文件严格模式，默认为false */
      disableUseStrict: false,
      /** 上传时压缩 JS 代码 */
      minifyJS: false,
      /** 上传时压缩 WXML 代码 */
      minifyWXML: true,
      /** 上传时压缩 WXSS 代码 */
      minifyWXSS: false,
      /** 上传时压缩所有代码，对应于微信开发者工具的 "上传时压缩代码" */
      minify: false,
      /** 对应于微信开发者工具的 "上传时进行代码保护" */
      codeProtect: true,
      /** 对应于微信开发者工具的 "上传时样式自动补全" */
      autoPrefixWXSS: false,
    },
  },
})) satisfies UserConfig.PlatformConfigFn
