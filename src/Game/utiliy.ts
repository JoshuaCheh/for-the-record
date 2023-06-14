const isSquare = (n: number) => {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};

export const isFibonacci = (num: number) => {
  if (isSquare(5 * (num * num) - 4) || isSquare(5 * (num * num) + 4)) {
    return true;
  } else {
    return false;
  }
};
