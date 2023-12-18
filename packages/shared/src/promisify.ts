interface Result {
  errMsg: string
}

interface GeneralOption<T = Result> {
  success?(res: T): void
  fail?(res: Result): void
  complete?(res: Result & T): void
}

export function promisify<T extends GeneralOption, R extends Parameters<NonNullable<T['success']>>[0]>(
  api: (option: T) => void,
) {
  return (option?: Omit<T, keyof GeneralOption>): Promise<R> =>
    new Promise((success, fail) => {
      api({
        ...option,
        success,
        fail,
      } as T)
    })
}
