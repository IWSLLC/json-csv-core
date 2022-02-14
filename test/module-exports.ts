import { expect } from 'chai'
import { default as buffered_index, buffered as index_named, toCsv } from '../dist'
import { default as direct_default, buffered as direct_named, toCsv as direct_toCsv } from '../dist/exporter'

describe('module exports', function() {
  it('index named export should exist', function() { expect(index_named).to.be.a('function') })
  it('toCsv named export should exist', function() { expect(toCsv).to.be.a('function') })
  it('index default export should be a func', function() { expect(buffered_index).to.be.a('function') })
  it('direct default export should be a func', function() { expect(direct_default).to.be.a('function') })
  it('direct named export should exist', function() { expect(direct_named).to.be.a('function') })
  it('direct direct_toCsv export should exist', function() { expect(direct_toCsv).to.be.a('function') })
})
