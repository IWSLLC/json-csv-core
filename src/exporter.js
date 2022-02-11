/** @type { import("./types").CheckOptions } */
export function checkOptions(opts) {
  const options = opts == null ? {} : { ...opts }
  if (options.fieldSeparator == null) options.fieldSeparator = ','
  if (options.ignoreHeader == null) options.ignoreHeader = false
  if (options.buffered == null) options.buffered = true
  if (options.fields == null) options.fields = []
  if (options.encoding == null) options.encoding = 'utf8'
  return options
}

/**
 * Main entry point. Convert a buffered array of data to a CSV string.
 * @type { import("./types").Buffered }
 */
export function buffered(data, opts) {
  const options = checkOptions(opts)
  let output = ''
  let writtenHeader = false
  const { ignoreHeader, fields } = options

  data.forEach(dataItem => {
    if (!writtenHeader && !ignoreHeader) {
      writtenHeader = true
      const header = getHeaderRow(fields, options.fieldSeparator)
      output += header
    }

    const line = getBodyRow(dataItem, fields, options.fieldSeparator)
    output += line
  })

  return output
}

/** @type { import("./types").PrepValue } */
export function prepValue(text, forceQuoted, fieldSeparator) {
  if (text == null) text = ''
  const quoted = forceQuoted || text.indexOf('"') >= 0 || text.indexOf(fieldSeparator) >= 0 || text.indexOf('\n') >= 0
  let result = text.replace(/"/g, '""')
  if (quoted) { result = '"' + result + '"' }
  return result
}

/** @type { import("./types").GetHeaderRow } */
export function getHeaderRow(fields, fieldSeparator) {
  const fieldKeys = Object.keys(fields)
  let header = fieldKeys.reduce((line, fieldKey) => {
    const field = fields[fieldKey]
    const label = field.label || field.name
    if (line === 'START') {
      line = ''
    } else {
      line += fieldSeparator
    }
    line += prepValue(label, field.quoted, fieldSeparator)
    return line
  }, 'START')
  header += '\r\n'
  return header
}

/** @type { import("./types").GetBodyRow } */
export function getBodyRow(data, fields, fieldSeparator) {
  const reducer = (line, field) => {
    if (line === 'START') {
      line = ''
    } else {
      line += fieldSeparator
    }
    let val = getValue(data, field.name)
    // vinicioslc support to OR || operator  allowing multiples names to the same column
    // the code will use the last non null and non empty value
    if (field.name.includes('||')) {
      // by default column is empty
      val = ''
      const fields = field.name.split('||')
      // for each alternative
      fields.forEach(field => {
        // get value and associate
        const fieldVal = getValue(data, field)
        // remove whitespaces and check if non null before assign
        if (val != null && fieldVal.trim().length > 0 && fieldVal.trim() !== '') {
          val = fieldVal
        }
        // do this for every field
      })
    }

    if (typeof field.transform === 'function') {
      val = field.transform(val)
    } else if (typeof field.filter === 'function') {
      val = field.filter(val)
    }
    if (typeof val !== 'undefined' && val !== null) {
      const quoted = typeof field.quoted !== 'undefined' && field.quoted
      line += prepValue(val.toString(), quoted, fieldSeparator)
    }
    return line
  }

  let row = fields.reduce(reducer, 'START')
  row += '\r\n'
  return row
}

/** @type { import("./types").GetValue } */
export function getValue(data, keyPath) {
  const keys = keyPath.split('.')
  if (keys.length > 0) return getValueIx(data, keys, 0)
  return ''
}

/** @type { import("./types").GetValueIx } */
export function getValueIx(data, keys, ix) {
  if (data == null) { return '' }

  // for filtered fields using the whole row as a source.
  // `this` is a keyword here; hoping not to conflict with existing fields.
  if (keys[0] === 'this') { return data }

  const val = data[keys[ix]]
  if (typeof val === 'undefined') { return '' }

  // walk the dot-notation recursively to get the remaining values.
  if ((keys.length - 1) > ix) { return getValueIx(val, keys, ix + 1) }

  return val
}

export default buffered
