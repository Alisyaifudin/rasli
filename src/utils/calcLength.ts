export const calcLength = (value: number, max: number) => {
  if(max === 0) return 1
  return 1 + value/max*9
}