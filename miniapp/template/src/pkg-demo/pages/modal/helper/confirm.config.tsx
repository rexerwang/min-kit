import { confirmModal, MinIcon, renderText } from '@min-kit/components'

export interface IConfirmConfig {
  label: string
  props: Partial<Parameters<typeof confirmModal>[0]>
  timeout?: number
  span?: boolean
}

export const ConfirmConfigSet: { title: string; config: IConfirmConfig[] }[] = [
  {
    title: 'ConfirmModal Props',
    config: [
      { label: 'title by string', props: { title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨' } },
      {
        label: 'title by JSX',
        props: {
          title: renderText('对不起，您所拔打的电话\n正在通话中，请稍后再拨', {
            className: 'underline decoration-double',
          }),
        },
      },
      {
        label: 'subtitle by string',
        props: {
          title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
          subtitle: 'Sorry! The subscriber you dialed\n is busy now, please redial later.',
        },
      },
      {
        label: 'subtitle by JSX',
        props: {
          title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
          subtitle: renderText('Sorry! The subscriber you dialed\n is busy now, please redial later.', {
            className: 'underline decoration-dotted',
          }),
        },
      },
      {
        label: 'footer by string',
        props: {
          title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
          subtitle: 'Sorry! The subscriber you dialed\n is busy now, please redial later.',
          footer: '您所拔打的电话正在通话中，请稍后再拨\nThe subscriber you dialed is busy now.',
        },
      },
      {
        label: 'footer by JSX',
        props: {
          title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
          footer: renderText('您所拔打的电话正在通话中，请稍后再拨\nThe subscriber you dialed is busy now.', {
            className: 'underline decoration-dotted',
          }),
        },
      },
      {
        label: 'icon by string',
        props: {
          icon: 'warn',
          title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
          subtitle: 'Sorry! The subscriber you dialed\n is busy now, please redial later.',
          footer: '您所拔打的电话正在通话中，请稍后再拨\nThe subscriber you dialed is busy now.',
        },
      },
      {
        label: 'icon by JSX',
        props: {
          icon: <MinIcon name='react' size={100} />,
          title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
          subtitle: 'Sorry! The subscriber you dialed\n is busy now, please redial later.',
          footer: '您所拔打的电话正在通话中，请稍后再拨\nThe subscriber you dialed is busy now.',
        },
      },
      {
        label: '确认按钮文案',
        props: {
          subtitle: JSON.stringify({ okText: '确认' }),
          okText: '确认',
          footer: '`okText`为必填',
        },
      },
      {
        label: '取消按钮文案',
        props: {
          subtitle: JSON.stringify({ cancelText: '取消' }),
          cancelText: '取消',
          footer: '若设置了`cancelText`, 默认不显示底部关闭图标',
        },
      },
      {
        label: '设置俩按钮inline布局',
        props: {
          subtitle: JSON.stringify({ cancelText: '取消', buttonInline: true }),
          okText: '确认',
          cancelText: '取消',
          buttonInline: true,
          footer: '必须同时设置`cancelText`',
        },
        span: true,
      },
      {
        label: '显示底部关闭图标',
        props: {
          subtitle: JSON.stringify({ closeable: true }),
          cancelText: '取消',
          closeable: true,
        },
      },
      {
        label: '隐藏divider',
        props: {
          subtitle: JSON.stringify({ divider: false }),
          divider: false,
        },
      },
      {
        label: '设置文本可选\n（长按文本选择复制）',
        props: {
          subtitle: JSON.stringify({ userSelect: true }),
          userSelect: true,
        },
        span: true,
      },
    ],
  },

  {
    title: 'Modal Props',
    config: [
      {
        label: '顶部弹出',
        props: {
          subtitle: JSON.stringify({ position: 'top' }),
          position: 'top',
        },
      },
      {
        label: '底部弹出',
        props: {
          subtitle: JSON.stringify({ position: 'bottom' }),
          position: 'bottom',
        },
      },
      {
        label: '中间弹出（默认）',
        props: {
          subtitle: JSON.stringify({ position: 'center' }),
          position: 'center',
        },
        span: true,
      },
      {
        label: '设置进场动画时长',
        props: {
          subtitle: JSON.stringify({ duration: 500 }),
          duration: 500,
        },
      },
      {
        label: '设置zIndex',
        props: {
          subtitle: JSON.stringify({ zIndex: 999 }),
          zIndex: 999,
          footer: '`zIndex`默认递增',
        },
      },
      {
        label: '设置点击背景关闭',
        props: {
          subtitle: JSON.stringify({ backdropCloseable: true }),
          backdropCloseable: true,
        },
        span: true,
      },
      {
        label: '设置offsetY (与position组合，可为负值)',
        props: {
          subtitle: JSON.stringify({ offsetY: 100, position: 'bottom' }),
          offsetY: 100,
          position: 'bottom',
          closeable: false,
        },
        span: true,
      },
      {
        label: '设置offsetX (与position组合，可为负值)',
        props: {
          subtitle: JSON.stringify({ offsetX: 40, position: 'bottom' }),
          offsetX: 40,
          position: 'bottom',
          closeable: false,
        },
        span: true,
      },
    ],
  },
]
