/* eslint-disable @typescript-eslint/no-explicit-any */
declare type ExtractFCParam<T> = T extends (...args: infer P) => any
  ? P[0]
  : never
