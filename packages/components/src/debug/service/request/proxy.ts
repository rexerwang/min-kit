import { defineProperty } from '@min-kit/shared'

interface RequestProxy {
  request(...args: any[]): Promise<any>
  inject(value: any): void
  uninject(): void
}

function createRequestProxy(root: any) {
  const proxy: RequestProxy = {
    request: root.request,
    inject(value: any) {
      defineProperty(root, 'request', { value })
    },
    uninject() {
      defineProperty(root, 'request', { value: proxy.request })
    },
  }

  return proxy
}

export function getRequestProxy() {
  if (process.env.TARO_ENV === 'tt') {
    return createRequestProxy(tt)
  }

  if (process.env.TARO_ENV === 'alipay') {
    return createRequestProxy(my)
  }

  return createRequestProxy(wx)
}
