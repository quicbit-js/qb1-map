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

var tbase = require('qb1-type-base')
var obj2type = require('qb1-obj2type')
var TYPES_BY_NAME = tbase.types_by_all_names()
var STR_TYPE = tbase.lookup('str')

// This is just the bits of HMap constructor that were taken out of qb-hmap (type stuff) to be put in again for qb1-map
function HMap (all_keys, by_hash, by_hash_col, h_arr, c_arr, opt) {
  // ...
  if (opt.vtype && !opt.vtype.base) {
      opt.vtype = TYPES_BY_NAME[opt.vtype] || obj2type(opt.vtype).root
  }
  this.vtype = opt.vtype || null
  // ...
}
HMap.prototype = {
  // HALT: HALT,
  // constructor: HMap,
  get first () { return this.h_arr.length === 0 ? undefined : this.get_hc(this.h_arr[0], this.c_arr[0]) },
  get last () {
    return this.h_arr.length === 0
      ? undefined
      : this.get_hc(this.h_arr[this.h_arr.length - 1], this.c_arr[this.c_arr.length - 1])
  },
  // clear: function () {
  //   this.by_hash.length = 0
  //   this.by_hash_col.length = 0
  //   this.h_arr.length = 0
  // ...
}

HSet.prototype = {
  HALT: HALT,
  constructor: HSet,
  get vtype () { return this.map.vtype },
  // ...
  get first () { return this.map.first },
  get last () { return this.map.last },
  // clear: function () { this.map.clear() },
  // cop: function (n) { return new HSet(this.map.cop(n)) },
  // get_hc: function (h, c) { return this.map.get_hc(h, c) },
  // ...
}

function SuperSet (value_fns, opt) {
  // ...
  this.vtype = opt.vtype || null
  // HSet.call(this, new HMap(this, [], [], [], [], this.opt))
}

function string_set (opt) {
  //...
  return new SuperSet(assign({}, default_fns), assign({}, opt, {vtype: STR_TYPE}))
}

StrBuf.prototype = {
  // constructor: StrBuf,
  $type: 'str',
  // get raw_array () { return this.src },           // raw_array "interface" - along with off and lim.
  // toString: buf_to_str,
  // to_obj: buf_to_str,
}

function for_val (a, fn) {
  if (a.for_val) {
    a.for_val(fn)
  } else {
    a.forEach(fn)
  }
}

function first (a) {
  return a.first ? a.first : a[0]
}

function last (a) {
  return a.last ? a.last : a[a.length - 1]
}

module.exports = {
  for_val: for_val,
  first: first,
  last: last,
}