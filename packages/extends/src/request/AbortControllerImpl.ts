type Listener = () => void

/**
 * simplified implement of `AbortController`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 */
export class AbortControllerImpl {
  private aborted = false
  private reason: string | undefined
  private listeners: Listener[] = []

  get signal() {
    return { aborted: this.aborted, reason: this.reason }
  }

  abort(reason?: string) {
    if (this.aborted) return

    this.aborted = true
    this.reason = reason

    this.emit()
  }

  private emit() {
    this.listeners.splice(0).forEach((listener) => {
      listener()
    })
  }

  on(listener: Listener) {
    this.listeners.push(listener)
  }
}
