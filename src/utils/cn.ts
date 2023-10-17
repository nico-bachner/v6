export const cn = (...args: any[]) =>
  args.filter((arg) => typeof arg == 'string').join(' ')
