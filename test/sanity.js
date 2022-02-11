describe('example test', function() {
  before(function() {
    this.result = 5
  })
  it('should be 5; ensuring linter and mocha rules are working', function() { expect(this.result).to.equal(5) })
})
