// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'

export default {
  input: 'index.module.js',
  plugins: [
    babel({
      presets: [
        ['env', {
          targets: { node: 'current' },
          modules: false
        }]
      ]
    })
  ],
  external: [
    'glsl-deparser',
    'glsl-parser',
    'glsl-tokenizer/stream',
    'rollup-pluginutils',
    'stream'
  ],
  output: [
    {
      format: 'cjs',
      file: 'index.js'
    }
  ]
}
