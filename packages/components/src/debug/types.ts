import type { AnyObject } from '../types'

interface UserApis {
  getToken(): string | undefined
  getUserInfo(reLogin?: boolean): Promise<AnyObject | void>
}

export interface IUserOptions {
  user: UserApis
}
