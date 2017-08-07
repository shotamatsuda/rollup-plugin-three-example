'use strict';

var rollupPluginutils = require('rollup-pluginutils');

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function threeExample(options) {
  if ( options === void 0 ) options = {};

  var filter = rollupPluginutils.createFilter(options.include || options.exclude);

  return {
    name: 'three-example',

    transform: function transform(code, id) {
      if (!filter(id)) {
        return null
      }
      if (!/node_modules\/three\/examples\/js/.test(id)) {
        return null
      }
      var intro = "import * as THREE from 'three';";
      var transformedCode = intro + "(function (THREE) { " + code + " })(THREE);";
      return {
        code: transformedCode,
        map: { mappings: '' },
      }
    },
  }
}

module.exports = threeExample;
