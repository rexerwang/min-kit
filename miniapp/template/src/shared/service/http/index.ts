import { createRequest } from '@miniapp/extends'

import { authenticate, timestamp } from './middleware'

const http = createRequest({ baseUrl: G.baseUrl }).use(authenticate(3)).use(timestamp())

export default http

/** Response Body of backend */
export interface IRes<D = any> {
  data: D
  code: string
  error?: string
}
