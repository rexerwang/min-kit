import { createRequest } from '@miniapp/extends'

// Do not use `@shared/http` to avoid circular-dependency issue
const http = createRequest({ baseUrl: G.baseUrl })

export function signin(code: string) {
  return http.post<{ data: { token: string } }>('/auth/wechat/login', { code }).then((r) => r.data.data.token)
}
