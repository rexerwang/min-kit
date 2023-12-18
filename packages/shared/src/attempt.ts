/**
 * another way to try-catch. ignore exception
 */
export function attempt<T extends (..._: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> | undefined {
  try {
    return fn(...args)
  } catch (e) {
    console.error(e)
  }
}

/** try-catch asynchronously */
attempt.async = async <P extends any[], R extends any>(
  fn: (...args: P) => Promise<R>,
  ...args: P
): Promise<R | undefined> => {
  try {
    return await fn(...args)
  } catch (e) {
    console.error(e)
  }
}
