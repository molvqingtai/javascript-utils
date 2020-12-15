import { utils, writeFile, write } from 'xlsx'
import typeOf from './type-of'

/**
 * Json 数据转 Excel 文件
 * @param {Array} sheets [sheet 列表]
 * @param {String} download [下载 Excel 文件名称]
 * @return {[ArrayBuffer,String]}
 */
const jsonToExcel = (sheets, download) => {
  if (typeOf(sheets) !== 'Array') throw new Error('Sheets must be a array.')

  const options = { bookType: 'xlsx', type: 'array' }
  const workBook = utils.book_new()
  sheets.forEach((item) => {
    const workSheet = utils.json_to_sheet(item.body)
    utils.book_append_sheet(workBook, workSheet, item.name)
  })
  return download ? writeFile(workBook, `${download}.xlsx`, options) : write(workBook, options)
}

export default jsonToExcel
