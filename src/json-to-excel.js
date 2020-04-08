import { utils, writeFile, write } from 'xlsx'
import typeOf from './type-of'

const jsonToExcel = (sheets, download) => {
  typeOf(sheets) !== 'Array' && new Error('Sheets must be a array.')
  const options = { bookType: 'xlsx', type: 'array' }
  const workBook = utils.book_new()
  sheets.forEach(item => {
    const workSheet = utils.json_to_sheet(item.body)
    utils.book_append_sheet(workBook, workSheet, item.name)
  })
  return download ? writeFile(workBook, `${download}.xlsx`, options) : write(workBook, options)
}

export default jsonToExcel
