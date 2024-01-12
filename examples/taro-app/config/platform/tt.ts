import type { UserConfig } from '@min-kit/helper/taro'

/** 抖音小程序配置 */
export default ((appid) => {
  const config = {
    projectname: '@min-kit/taro-app',
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
      email: 'your-email',
      password: 'you-password',
    },
  }
}) satisfies UserConfig.PlatformConfigFn
