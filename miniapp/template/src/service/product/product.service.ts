import http, { type IRes } from '../http'

import type { IProduct } from './product.type'

const mockData: IProduct = { id: 'mock001', name: 'mock001', price: 110 }

export function getProducts() {
  return http.get<IRes<IProduct[]>>('/get?x=getProducts').then((r) => r.data.data ?? [mockData])
}
