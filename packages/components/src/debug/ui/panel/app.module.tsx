import { copy, go, logger, toast } from '@min-kit/extends'
import { useQuery } from '@min-kit/hooks'
import { attempt, qs } from '@min-kit/shared'
import { Button, Input, ScrollView, Text, View } from '@tarojs/components'
import {
  clearStorageSync,
  getCurrentPages,
  openSetting,
  removeStorageSync,
  requestSubscribeMessage,
  setStorageSync,
  showModal,
} from '@tarojs/taro'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { IStorageData, IStorageInfo, StorageService, StorageType } from '../../service/storage.service'

interface IPageStack {
  length: number
  current: string
  stack: string[]
}

enum AppTab {
  Router = '路由',
  Storage = '本地缓存',
  Subscribe = '订阅消息',
}

const Tabs = [AppTab.Router, AppTab.Storage, AppTab.Subscribe]

export default function AppModule() {
  const [tab, setTab] = useState(AppTab.Router)

  const [pageStack, setPageStack] = useState<IPageStack>()
  const [stackVisible, setStackVisible] = useState(false)
  const [path, setPath] = useState('')

  const [storage, setStorage] = useState<IStorageInfo>()
  const [selectedKey, selectKey] = useState<string>()

  const [subscribeIds, setSubscribeIds] = useState('')

  const getPageStack = () => {
    const stack = getCurrentPages().map((v) => qs.stringifyUrl({ url: '/' + v.route, query: v.options }))

    setPageStack({
      stack,
      length: stack.length,
      current: stack.at(-1) ?? '',
    })
  }

  const getStorage = () => {
    setStorage(attempt(StorageService.info))
  }

  const removeStorageData = (key: string) => {
    try {
      removeStorageSync(key)
      selectKey(undefined)
      getStorage()
    } catch {
      toast.error()
    }
  }

  const setStorageData = (key: string, value: any, type: StorageType) => {
    const res = StorageService.parse(value, type)
    if (res === undefined) {
      toast('值类型错误')
      return
    }

    try {
      setStorageSync(key, res)
      getStorage()
    } catch {
      toast.error()
    }
  }

  const addOrUpdateStorage = (data?: IStorageData) => {
    const option: any = { editable: true }

    // edit
    if (data) {
      option.title = data.key
      option.content = data.valueString
      option.success = ({ content, confirm }) => {
        if (!confirm) return

        const type = data.type === StorageType.Null ? StorageType.String : data.type

        setStorageData(data.key, content, type)
      }
    }
    // add
    else {
      option.title = '添加'
      option.placeholderText = 'Key: Type = Value'
      option.success = ({ content, confirm }) => {
        if (!confirm || !content) return

        const [keyType, value] = (content as string).split('=').map((i) => i.trim())
        const [key, type] = keyType.split(': ').map((i) => i.trim())

        setStorageData(key, value, (type || StorageType.String) as StorageType)
        selectKey(key)
      }
    }

    showModal(option)
  }

  const { query: subscribeMessage, loading: subscribeLoading } = useQuery(async () => {
    try {
      const tmplIds = subscribeIds.split(',')
      await requestSubscribeMessage({ tmplIds })
      toast.success('订阅成功')
    } catch (error) {
      toast.error('订阅失败')
      logger.error('#requestSubscribeMessage', error)
    }
  })

  useEffect(() => {
    if (tab === AppTab.Storage) {
      getStorage()
    } else if (tab === AppTab.Router) {
      getPageStack()
    }
  }, [tab])

  return (
    <View className={clsx('appModule', 'tabs', 'min')}>
      <View className='tabHeader'>
        {Tabs.map((i) => (
          <View className={clsx('tab', i === tab && 'active')} key={i} onClick={() => setTab(i)}>
            {i}
          </View>
        ))}
      </View>
      <View className={clsx('tabBody', 'panel')}>
        <>
          {tab === AppTab.Router && (
            <View className={clsx('main', 'route')}>
              <View className='section'>
                <View className='title' onClick={() => setStackVisible((v) => !v)}>
                  <View>页面栈</View>
                  <View>{pageStack?.length}</View>
                </View>
                <View className={clsx('content', 'wrap')} onClick={() => copy(pageStack?.current)}>
                  {pageStack?.current}
                </View>
                {stackVisible && (
                  <View className={clsx('content')} onClick={() => copy(pageStack?.stack.join('\n'))}>
                    <Text decode space='nbsp'>
                      {pageStack?.stack.map((v, i) => `${i + 1}. ${v}`).join('\n')}
                    </Text>
                  </View>
                )}
              </View>
              <View className='section'>
                <View className='title'>跳转页面</View>
                <View className={clsx('content', 'field')}>
                  <Input placeholder='请输入跳转页面路径' value={path} onInput={(e) => setPath(e.detail.value)} />
                  <Button type='warn' size='mini' plain onClick={() => path && go(path)}>
                    跳转
                  </Button>
                </View>
              </View>
            </View>
          )}

          {tab === AppTab.Storage && (
            <>
              <ScrollView className={clsx('main', 'storage')} scrollY>
                <View className={clsx('section', 'usage')}>
                  <View className='content'>
                    <View className={clsx('row', 'bold')}>
                      <View className='col'>总空间</View>
                      <View className='col'>已用空间</View>
                      <View className='col'>可用空间</View>
                    </View>
                    <View className='row'>
                      <View className='col'>{storage ? storage.limitSize : '-'}KB</View>
                      <View className='col'>{storage ? storage.currentSize : '-'}KB</View>
                      <View className='col'>
                        {storage ? storage.limitSize - storage.currentSize : '-'}
                        KB
                      </View>
                    </View>
                  </View>
                </View>

                <View className={clsx('section', 'list')}>
                  <View className='content'>
                    <View className={clsx('row', 'bold')}>
                      <View className='col'>Key</View>
                      <View className='col'>Value</View>
                      <View className='col'>Type</View>
                    </View>
                    {storage?.data.map((d) => (
                      <View
                        className={clsx('row', selectedKey === d.key && 'expand')}
                        key={d.key}
                        onClick={(e) => {
                          if (d.key === selectedKey && e.target.dataset.editable) {
                            addOrUpdateStorage(d)
                          } else {
                            selectKey((key) => (key === d.key ? '' : d.key))
                          }
                        }}>
                        <View className='col'>
                          <View>{d.key}</View>
                        </View>
                        <View className='col' data-editable>
                          {d.valueString}
                        </View>
                        <View className='col'>{d.type}</View>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
              <View className='footer'>
                <Button plain onClick={getStorage}>
                  刷新
                </Button>
                <Button plain onClick={() => addOrUpdateStorage()}>
                  添加
                </Button>
                {selectedKey ? (
                  <Button
                    plain
                    onClick={() => {
                      removeStorageData(selectedKey)
                    }}>
                    移除
                  </Button>
                ) : (
                  <Button
                    plain
                    onClick={() => {
                      attempt(clearStorageSync)
                      getStorage()
                    }}>
                    清空
                    {storage?.data.length ? `(${storage?.data.length})` : ''}
                  </Button>
                )}
              </View>
            </>
          )}

          {tab === AppTab.Subscribe && (
            <View className={clsx('main', 'subscribe')}>
              <View className='section'>
                <View className='title'>订阅消息模板ID</View>
                <View className={clsx('content', 'field')}>
                  <Input
                    placeholder='多个逗号分隔，最多3个'
                    value={subscribeIds}
                    disabled={subscribeLoading}
                    onInput={(e) => setSubscribeIds(e.detail.value.trim())}
                  />
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 5px',
                }}>
                <Button
                  size='mini'
                  plain
                  style={{ margin: '0' }}
                  onClick={() => openSetting({ withSubscriptions: true })}>
                  打开设置
                </Button>
                <Button
                  type='warn'
                  size='mini'
                  plain
                  style={{ margin: '0' }}
                  disabled={!subscribeIds}
                  loading={subscribeLoading}
                  onClick={subscribeMessage}>
                  立即订阅
                </Button>
              </View>
            </View>
          )}
        </>
      </View>
    </View>
  )
}
