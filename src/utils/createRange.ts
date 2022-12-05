const defaultInitializer = (index: number) => index;

export function createRange(
  length: number,
  initializer: (index: number) => number | string = defaultInitializer
): (number | string)[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}
