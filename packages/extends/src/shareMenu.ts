import { hideShareMenu as hideShareMenuApi, showShareMenu as showShareMenuApi } from '@tarojs/taro'

import { logger } from './logger'

export async function hideShareMenu() {
  try {
    await hideShareMenuApi()
    logger.debug('#hideShareMenu')
  } catch (error) {
    logger.error('#hideShareMenu', error)
  }
}

interface IOption extends Pick<Taro.showShareMenu.Option, 'withShareTicket'> {
  showShareItems: ['shareAppMessage'] | ['shareAppMessage', 'shareTimeline']
}

export async function showShareMenu(option: IOption = { showShareItems: ['shareAppMessage', 'shareTimeline'] }) {
  try {
    await showShareMenuApi(option)
    logger.debug('#showShareMenu', option)
  } catch (error) {
    logger.error('#showShareMenu', error)
  }
}
