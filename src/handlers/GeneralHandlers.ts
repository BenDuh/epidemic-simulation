export const _getRandomArbitrary = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const _inRange = (x: number, min: number, max: number): boolean => {
  return (x - min) * (x - max) <= 0;
};
