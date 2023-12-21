import { type Middleware } from '@miniapp/extends'
import { HttpStatus, sleep } from '@miniapp/shared'

import authStore from '@/shared/store/auth'

export function authenticate(retryTimes: number): Middleware {
  let loginPromise: Promise<void> | undefined

  const renewToken = () => {
    if (!loginPromise) loginPromise = authStore.apis.login().then(() => sleep(100))
    return loginPromise.finally(() => {
      loginPromise = undefined
    })
  }

  return async (ctx, next) => {
    // Before sending this request, check if the token exists.
    // If token doesn't exist, wait for renew.
    if (!authStore.apis.getToken()) await renewToken()

    ctx.set('Authorization', authStore.apis.getToken())

    // waiting for this request responding
    await next()

    // if this request respond 401, reauthenticate && replay
    if (ctx.statusCode === HttpStatus.UNAUTHORIZED && (ctx.request.replayed ?? 0) < retryTimes) {
      await renewToken()
      await ctx.replay()
    }
  }
}
