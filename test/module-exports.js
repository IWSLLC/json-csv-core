/* eslint-disable import/no-named-default */
/* eslint-disable camelcase */
import { default as buffered_index, buffered as index_named } from '../dist'
import { default as direct_default, buffered as direct_named } from '../dist/exporter'

describe('module exports', function() {
  it('index named export should exist', function() { expect(index_named).to.be.a('function') })
  it('index default export should be a func', function() { expect(buffered_index).to.be.a('function') })
  it('direct default export should be a func', function() { expect(direct_default).to.be.a('function') })
  it('direct named export should exist', function() { expect(direct_named).to.be.a('function') })
})
