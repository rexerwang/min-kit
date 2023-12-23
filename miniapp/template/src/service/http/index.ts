import { createRequest } from '@min-kit/extends'

import { timestamp } from './middleware/timestamp'

const http = createRequest({ baseUrl: G.baseUrl }).use(timestamp())

export default http

/** Response Body of backend */
export interface IRes<D = any> {
  data: D
  code: string
  error?: string
}
