// Software License Agreement (ISC License)
//
// Copyright (c) 2023, Matthew Voss
//
// Permission to use, copy, modify, and/or distribute this software for
// any purpose with or without fee is hereby granted, provided that the
// above copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var test = require('test-kit').tape()
var qbmap = require('.')

test('for_val function', function (t) {
  var set1 = qbmap.string_set()
  var vals = ['a', 'b']
  qbmap.for_val(vals, function (v, i) { t.same(vals[i], v, 'array iteration') })
  qbmap.for_val(vals, function (v) {
    set1.put(v)
  })
  t.same(set1.to_obj(), vals, 'set has all values')

  qbmap.for_val(set1, function (v, i) { t.same(v.toString(), vals[i], 'vals[' + i + ']') })
  t.end()
})


test('first and last functions', function (t) {
  t.table_assert([
    ['keys', 'exp'],
    [[], [undefined, undefined]],
    // [ [ 'a' ],                 ['a', 'a'] ],
    [['a', 'b', 'a'], ['a', 'b']],
    [['a', 'b', 'c'], ['a', 'c']],
    [['a', 'b', 'c', 'a'], ['a', 'c']],
  ], function (vals) {
    var set = qbmap.string_set()
    vals.forEach(function (v) { set.put(v) })

    return [qbmap.first(set) && qbmap.first(set).toString(), qbmap.last(set) && qbmap.last(set).toString()]
  })
})

test('first and last', function (t) {
  var superset = qbmap.string_set()
  var set1 = superset.hset()

  var abc = ['a', 'b', 'c'].map(function (v) { return superset.put(v).to_obj() })
  t.same(abc, ['a', 'b', 'c'])
  t.same(superset.to_obj(), ['a', 'b', 'c'], 'to_obj()')
  t.same(superset.first.to_obj(), 'a', 'first()')
  t.same(superset.last.to_obj(), 'c', 'last()')

  t.same(set1.first, undefined, 'first() undefined')
  t.same(set1.last, undefined, 'last() undefined')
  t.same(set1.to_obj(), [], 'to_obj() empty')
  t.end()
})

test('hash', function (t) {
  t.table_assert([
    ['a', 'b', 'exp'],
    [1, 2, 35],
    [35, 3, 1152],
    [1152, 4, 38020],
    [97, 98, 3299],
    [3299, 99, 108832],
    [108832, 99, 3591491],
  ], hmap.hash)
})
