'use strict'

require('../index')();
let assert = require('assert');

describe('test String linqable', () => {
  let s = 'Hello world, hello LINQ! 0';
  let ss = 'ss';
  
  it('all', () => {
    assert.strictEqual(s.all(i => i), true);
    assert.strictEqual(ss.all(i => i === 's'), true);
    assert.strictEqual(''.all(i => i), true);
  });
  
  it('any', () => {
    assert.strictEqual(s.any(), true);
    assert.strictEqual(s.any(i => i === '0'), true);
    assert.strictEqual(''.any(), false);
  });
  
  it('aggregate', () => {
    assert.strictEqual(s.aggregate((c, n) => c + n), s);
    assert.strictEqual(s.aggregate('xx', (c, n) => c + n), 'xx' + s);
  });
  
  it('average', () => {
    assert(isNaN(s.average()));
  });
  
  it('concat', () => {
    assert.deepEqual(s.concatenate('mxmx').toArray(), Array.from(s + 'mxmx'));
  });
  
  it('contains', () => {
    assert(s.contains('N'));
    assert(!s.contains(0));
  });
  
  it('count', () => {
    assert(s.count() === s.length);
    assert(''.count() === ''.length);
  });
  
  it('defaultIfEmpty', () => {
    assert(s.defaultIfEmpty().count() === s.length);
    assert.deepEqual(''.defaultIfEmpty(0).toArray(), [0]);
  });
  
  it('distinct', () => {
    assert.deepEqual(s.distinct().toArray(), Array.from('Helo wrd,hLINQ!0'));
  });
  
  it('elementAt', () => {
    assert(s.elementAt(5) === ' ');
  });
  
  it('except', () => {
    assert.deepEqual(s.except('o').toArray(), Array.from('Hell wrld, hell LINQ! 0'));
  });
  
  it('first', () => {
    assert.strictEqual(s.first(), 'H');
    assert.strictEqual(s.first(i => i == 0), ' ');
  });
  
  it('single', () => {
    assert.strictEqual(s.single(i => i === '0'), '0');
    assert.throws(() => s.single(i => i == 'l'), Error);
  });
  
  it('skip', () => {
    assert.strictEqual(s.skip(5).count(), s.length - 5);
  });
  
  it('select', () => {
    assert.deepEqual(s.select(c => c.toUpperCase()).toArray(), Array.from(s.toUpperCase()));
    assert.equal(s.select(c => c.toUpperCase()).toArray().toString().replace(/,/g, ''), s.replace(',', '').toUpperCase());
  });
  
  it('intersect', () => {
    assert.deepEqual(s.intersect(s).toArray(), Array.from('Helo wrd,hLINQ!0'));
  });
  
  it('union', () => {
    assert.deepEqual(s.union('J').toArray(), Array.from(s.distinct().concatenate('J')));
  });
  
  it('sequenceEqual', () => {
    assert(s.union('J').sequenceEqual(s.distinct().concatenate('J')));
  });
  
  it('where', () => {
    assert(ss.where(i => i > 's').count() === 0);
  });
  
  it('ipv6', () => {
    let dstAddr = '';
    
    let bytes = new Buffer([0x82, 0x89, 0x90, 0xef, 0x11, 0xff, 0xbc, 0x86, 0x23, 0x98, 0x00, 0xaf, 0x17, 0x33, 0xcc, 0x16]);
    for (let i = 0; i < 8; i++) {
      dstAddr += (new Buffer(bytes.skip(i * 2).take(2).toArray()).toString('hex') + (i < 7 ? ':' : ''));
    }
    
    assert(require('net').isIPv6(dstAddr));
  })
});