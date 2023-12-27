import { copy } from '@min-kit/extends'
import { Block, Button, Input, ScrollView, Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { prettyJSON, timing } from '../../helper'
import { RequestService } from '../../service/request.service'

const onCopy = (data: any) => () => {
  data && copy(data)
}

export default function NetworkModule() {
  const [selected, select] = useState('')
  const [filtering, setFiltering] = useState(false)
  const [filterText, setFilterText] = useState('')

  const { records, length } = RequestService.store.useRecords(filterText)

  const clear = () => {
    select('')
    RequestService.store.clear()
  }

  const handleClick = (reqId: string) => {
    select(reqId === selected ? '' : reqId)
  }

  useEffect(() => {
    if (!filtering) {
      setFilterText('')
    }
  }, [filtering])

  return (
    <View className={clsx('networkModule', 'panel')}>
      <ScrollView className='main' scrollY>
        {records.map((record) => (
          <Block key={record.reqId}>
            <View
              className={clsx(
                'row',
                selected === record.reqId && 'selected',
                record.statusCode && record.statusCode > 399 && 'error',
              )}
              key={record.reqId + 'row' + record.responseEnd}
              onClick={() => handleClick(record.reqId)}>
              <View className='col'>
                <View className='ellipsis'>{record.url}</View>
              </View>
              <View className='col'>{record.method}</View>
              <View className='col'>{record.response ? record.statusCode : ''}</View>
              <View className='col'>
                {record.responseEnd ? timing(record.responseEnd - record.requestStart) : '...'}
              </View>
            </View>
            {selected === record.reqId && (
              <View className='detail' key={record.reqId + 'detail' + record.responseEnd}>
                <View className='section'>
                  <Text className='title'>Request URL</Text>
                  <Text className='content' space='nbsp' onClick={onCopy(record.url)}>
                    {record.url}
                  </Text>
                  <View className='relative'>
                    <Text className='content' space='nbsp'>
                      {`Request Method: ${record.method}\nStatus Code: ${
                        (record.response && record.statusCode) || ''
                      }\nTiming: ${new Date(record.requestStart).toString()}`}
                    </Text>
                    <View className='clients'>
                      {['cURL', 'HTTPie'].map((client) => (
                        <View key={client} className='client' onClick={onCopy(RequestService.generate(client, record))}>
                          {client}
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <View className='section'>
                  <Text className='title'>Request Headers</Text>
                  <Text className='content' space='nbsp' onClick={onCopy(record.request.header)}>
                    {prettyJSON(record.request.header)}
                  </Text>
                </View>

                {record.request.data && (
                  <View className='section'>
                    <Text className='title'>Request Payload</Text>
                    <Text className='content' space='nbsp' onClick={onCopy(record.request.data)}>
                      {prettyJSON(record.request.data)}
                    </Text>
                  </View>
                )}

                {record.request.query && (
                  <View className='section'>
                    <Text className='title'>Query String Parameters</Text>
                    <Text className='content' space='nbsp' onClick={onCopy(record.request.query)}>
                      {prettyJSON(record.request.query)}
                    </Text>
                  </View>
                )}

                <View className='section'>
                  <Text className='title'>Response Headers</Text>
                  <Text className='content' space='nbsp' onClick={onCopy(record.response?.header)}>
                    {record.response ? prettyJSON(record.response.header) : '(pending)'}
                  </Text>
                </View>

                <View className='section'>
                  <Text className='title'>Response Body</Text>
                  <Text className='content' space='nbsp' onClick={onCopy(record.response?.data)}>
                    {record.response ? prettyJSON(record.response.data) : '(pending)'}
                  </Text>
                </View>

                {record.profile && (
                  <View className='section'>
                    <Text className='title'>Request Profile</Text>
                    <Text className='content' space='nbsp' onClick={onCopy(record.profile)}>
                      {prettyJSON(record.profile)}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </Block>
        ))}
        {length === 0 && <View className='empty'>Recording network activity...</View>}
      </ScrollView>
      <View className='footer'>
        <Button plain onClick={() => setFiltering(!filtering)}>
          筛选
        </Button>
        <Button plain onClick={clear}>
          清空{length ? `(${length})` : ''}
        </Button>
      </View>
      {filtering && (
        <View className='filterBox'>
          <Input placeholder='Filter' confirmType='search' onInput={(e) => setFilterText(e.detail.value)} focus />
        </View>
      )}
    </View>
  )
}
