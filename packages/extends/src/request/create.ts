import { Request, RequestConfig } from './Request'

export function create(config?: RequestConfig) {
  return new Request(config)
}
