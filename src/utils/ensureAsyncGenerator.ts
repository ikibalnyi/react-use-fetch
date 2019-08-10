
async function* ensureAsyncGenerator(fn: (...args: any[]) => any, ...args: any[]): any {
  const fnResult = fn(...args);
  if (typeof fnResult === 'object') {
    if (fnResult[Symbol.asyncIterator]) {
      return yield* await fnResult;
    } else if (fnResult[Symbol.iterator]) {
      return yield* fnResult;
    } else if (fnResult instanceof Promise) {
      return yield await fnResult;
    }
  }
  return yield fnResult;
}

export default ensureAsyncGenerator;
