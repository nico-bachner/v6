const nonNullable = <T extends unknown>(value: T): value is NonNullable<T> =>
  !!value

export const pruneArray = <T extends unknown>(array: T[]) =>
  array.filter((value) => nonNullable(value))
