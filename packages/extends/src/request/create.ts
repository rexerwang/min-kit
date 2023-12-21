import { Request, RequestConfig } from './Request'

export function createRequest(config?: RequestConfig) {
  return new Request(config)
}
