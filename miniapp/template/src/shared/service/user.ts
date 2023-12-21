import http, { IRes } from './http'

import type { IUser } from '../store/user'

export function getProfile() {
  return http.post<IRes<IUser>>('/user/profile').then((r) => r.data.data)
}
