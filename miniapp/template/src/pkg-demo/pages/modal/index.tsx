import { Button, View } from '@tarojs/components'
import clsx from 'clsx'

import Code from '@/components/code'
import Layout from '@/pkg-demo/components/layout'
import { MODAL_PROPS_SNIPPET, MODAL_USAGE_SNIPPET } from '@/pkg-demo/constants'

import { ConfirmConfigSet, showConfirm } from './helper/confirm'

export default function Index() {
  return (
    <>
      <Layout title='Modal组件'>
        {ConfirmConfigSet.map(({ title, config }) => (
          <View key={title} className='mb-4'>
            <View className='text-gray-500'>{title}</View>
            <View className='grid grid-cols-2 gap-2'>
              {config.map((c) => (
                <Button
                  key={c.label}
                  className={clsx(
                    'btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full',
                    c.span && 'col-span-2',
                  )}
                  hoverClass='shadow'
                  onClick={() => showConfirm(c)}>
                  {c.label}
                </Button>
              ))}
            </View>
          </View>
        ))}
      </Layout>

      <Code.Layout className='mt-2' code={MODAL_USAGE_SNIPPET} />
      <Code.Layout className='mt-2' title='props type' code={MODAL_PROPS_SNIPPET} />
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'Modal组件',
})
