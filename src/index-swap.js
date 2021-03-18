/**
 * 数组索引交换
 * @param {array} array  交换数组
 * @param {number} indexX 交换索引 x
 * @param {number} indexY 交换索引 y
 * @return {array} _array 新数组
 */
const indexSwap = (target, indexX, indexY) => {
  const array = [...target]
  ;[array[indexY], array[indexX]] = [target[indexX], target[indexY]]
  return array
}

export default indexSwap
