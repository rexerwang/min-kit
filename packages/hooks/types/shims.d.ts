declare namespace wx {
  namespace onAppRoute {
    interface CallbackResult {
      openType: string
      path: string
      query: Record<string, any>
    }

    type Callback = (e: CallbackResult) => void
  }
  /**
   * 监听路由变化
   * @private
   * @notice unstable
   */
  function onAppRoute(cb: onAppRoute.Callback)
  /**
   * 监听路由变化完成
   * @private
   * @notice unstable
   */
  function onAppRouteDone(cb: onAppRoute.Callback)
}
