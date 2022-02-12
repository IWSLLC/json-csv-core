# @iwsio/json-csv-core

[![Tests CI](https://github.com/IWSLLC/json-csv-core/actions/workflows/test.yaml/badge.svg)](https://github.com/IWSLLC/json-csv-core/actions/workflows/test.yaml)

Simple CSV export module that can export a rich JSON array of objects to CSV. 
This is a core project built for node AND browser. My goals here were to open up the audience for the predecessor package `json-csv`, which will still serve as the Node only extension of this one supporting features like Stream/Readable in Node.

This core library will focus on the buffered and single object -> CSV functionality.

## Getting Started

### Install
```bash
npm i @iwsio/json-csv-core
```

### Import with named or default exports.
```es6
import { buffered } from '@iwsio/json-csv-core'
import buffered from '@iwsio/json-csv-core'
```

### In Typescript, `buffered` is defined as:
```typescript
declare buffered = (data: any[], options: ExporterOptions) => string;
```

```es6
import { buffered } from '@iwsio/json-csv-core'

const data = [
  {
    field1: 'test',
    field2: 123,
    thing: {
      field3: true,
      field4: 'test'
    }
  },
  {field1: 'test', field2: 123, thing: { field3: true, field4: 'test'}},
  {field1: 'test', field2: 123, thing: { field3: false, field4: 'test'}},
  {field1: 'test', field2: 123, thing: { field3: true, field4: 'test'}}
]

const options = {
  fields: [
    {name: 'field1'}, // regular field by name
    {name: 'field2'},

    // using dot notation, we can specify which value to use.
    // provide a transform if you want the value to be modified for output.
    {name: 'thing.field3', label: 'field3', transform: (v) => v ? 'yes' : 'no'},
    {name: 'thing.field4', label: 'field4'},
  ]
}
const csv = jsoncsv(data, options)
```
```csv
field1,field2,field3,field4
test,123,yes,test
test,123,yes,test
test,123,no,test
test,123,yes,test
```

## Options
```js
{
  //field definitions for CSV export
  fields: [
    {
      // required: field name for source value
      name: 'string',

      // optional: column label for CSV header
      label: 'string',

      // optional: transform value before exporting
      transform: function(value) { return value; }
    }
  ],

  // Other default options:
  fieldSeparator: ',',
  ignoreHeader: false
}
```

## [Simple CSV](https://github.com/IWSLLC/json-csv-core/blob/main/samples/simple.mjs)
This simple example is much like what you see above. A simple list of key values that are exported to a CSV.

```bash
node samples/simple.mjs
```
### Outputs

```csv
"Name",Email,Amount
"fred",fred@somewhere,1.02
"jo",jo@somewhere,1.02
"jo with a comma,",jo@somewhere,1.02
"jo with a quote""",jo@somewhere,1.02
```

## [Advanced CSV](https://github.com/IWSLLC/json-csv-core/blob/main/samples/advanced.mjs)
This example uses a deeply nested object with dot notation references to the exported field names.

```bash
node samples/advanced.mjs
```

### Outputs
```csv
Company,Name,Email,Downloaded,Year,Level
"Widgets, LLC",John Doe,john@widgets.somewhere,pending,2013,Unknown
"Sprockets, LLC",Jane Doe,jane@sprockets.somewhere,downloaded,2013,Test 2
```