import { toCsv } from '../../core/dist/index.js'
import { items, options } from './advanced-setup.mjs'

const csv = toCsv(items, options)

console.log(csv)
