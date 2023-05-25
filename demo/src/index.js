import { toCsv } from '../../core/dist'
import { items, options } from './advanced-setup.mjs'

window.handleConvert = () => {
  const dom = document.getElementById('result-ctn')
  const sourceDom = document.getElementById('source')
  dom.innerText = ''
  sourceDom.innerText = JSON.stringify(items)
  const csv = toCsv(items, options)
  dom.innerText = csv
}
