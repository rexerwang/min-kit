import type { AnyObject } from '../types'

interface UserApis {
  getToken(): string | undefined
  getUserInfo(reLogin?: boolean): Promise<AnyObject | void>
}

export interface IBasicProps {
  user: UserApis
}

export interface IPanelProps extends IBasicProps {
  onClose(): void
}

export interface IDebuggerProps extends IBasicProps {
  onMove?(e: { x: number; y: number }): void
}

export interface IDebugOptions extends IBasicProps {}
