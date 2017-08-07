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

const buble = require('rollup-plugin-buble')
const chai = require('chai')
const nodeResolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const threeExample = require('..')

const expect = chai.expect

process.chdir(__dirname)

function execute(bundle) {
  return bundle.generate({
    format: 'cjs',
  }).then(generated => {
    // eslint-disable-next-line no-new-func
    const fn = new Function('module', 'exports', 'require', generated.code)
    const module = { exports: {} }
    fn(module, module.exports, require)
    return module
  })
}

describe('rollup-plugin-three-example', () => {
  it('imports three’s examples', () => {
    return rollup.rollup({
      entry: 'sample/index.js',
      plugins: [
        threeExample(),
        nodeResolve(),
        buble(),
      ],
      external: [
        'three',
      ],
    }).then(execute).then(module => {
      expect(module.exports.EffectComposer).not.undefined
    })
  })
})
