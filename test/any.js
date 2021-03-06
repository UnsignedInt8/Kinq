'use strict'

require('../index')();
let assert = require('assert');

describe('test any operator', () => {
  it('should return false', () => {
    let r = [0, 0, 0, 0, 0].any((i) => i !== 0);
    assert.equal(r, false);
  });

  it('should return true', () => {
    let r = [1, 0, 0, 'x'].any((i) => i === 'x');
    assert(r);
  });

  it('should return false', () => {
    let r = [].any(i => false);
    assert.equal(r, false);
  });

  it('should be true', () => {
    assert.equal([1].any(), true);
  });

  it('should be false', () => {
    assert.equal([].any(), false);
  });

  it('array & any', () => {
    let a1 = [1, 2, 3];
    assert.equal(a1.any(), true);
    assert.deepEqual(a1, [1, 2, 3]);
  })
})