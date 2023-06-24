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

HSet.prototype = {
  HALT: HALT,
  constructor: HSet,
  get vtype () { return this.map.vtype },
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
