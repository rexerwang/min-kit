import type { UserConfig } from '@min-kit/helper/compile'

/** 抖音小程序配置 */
export default ((appid) => {
  const config = {
    projectname: '@min-kit/example',
    appid,
    setting: {
      urlCheck: false,
      compileHotReLoad: false,
    },
  }

  return {
    project: [
      /** for Taro */
      {
        output: 'project.tt.json',
        miniprogramRoot: './',
        ...config,
      },
      // For devtools
      {
        output: 'project.config.json',
        miniprogramRoot: 'dist',
        ...config,
      },
    ],
    ci: {
      email: '字节小程序邮箱', // FIXME: 字节小程序邮箱
      password: '字节小程序密码', // FIXME: 字节小程序密码
    },
  }
}) satisfies UserConfig.PlatformConfigFn
