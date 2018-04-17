// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const babel = require('rollup-plugin-babel')
const chai = require('chai')
const nodeResolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const threeExample = require('..')

const expect = chai.expect

process.chdir(__dirname)

function execute (bundle) {
  return bundle.generate({
    format: 'cjs'
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
      input: 'sample/index.js',
      plugins: [
        threeExample(),
        nodeResolve(),
        babel({
          presets: [
            ['env', {
              targets: { browser: 'current' },
              modules: false
            }]
          ]
        })
      ],
      external: [
        'three'
      ]
    }).then(execute).then(module => {
      Object.keys(module.exports).forEach(key => {
        expect(module.exports[key]).not.undefined
      })
    })
  })
})
