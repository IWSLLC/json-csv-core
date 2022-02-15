import { toCsv } from '../dist/index.js'
import { items, options } from './advanced-setup.mjs'

const csv = toCsv(items, options)

console.log(csv)
