import typeOf from './type-of.js'

/**
 * 文件转数据
 * @param  {[File,Blob]} file        [文件对象]
 * @param  {String} [type='DataURL'] [数据类型]
 * @return {[type]}                  [输出数据]
 */
const fileToData = (file, type = 'DataURL') => {
  return new Promise((resolve, reject) => {
    typeOf(file) !== 'File' && typeOf(file) !== 'Blob' && reject(new Error('File must be a file or blob'))
    typeOf(type) !== 'String' && reject(new Error('DataURL must be a string.'))

    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result)
    reader.onerror = e => reject(new Error(e))
    new Map([
      ['Text', file => reader.readAsText(file)],
      ['DataURL', file => reader.readAsDataURL(file)],
      ['ArrayBuffer', file => reader.readAsArrayBuffer(file)],
      ['BinaryString', file => reader.readAsBinaryString(file)]
    ]).get(type)(file)
  })
}

export default fileToData
