// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { createFilter } from 'rollup-pluginutils'
import { Readable } from 'stream'
import deparser from 'glsl-deparser'
import parser from 'glsl-parser'
import tokenizer from 'glsl-tokenizer/stream'

const pattern1 = /Shader:\s*\[([\s\S]*?)\]\.join\(\s*(["'])\\n\2\s*\)/g
const replacer1 = /(["'])(.*?)\1,?/g
const pattern2 = /Shader:\s*(["'])([\s\S]*?)\1/g
const replacer2 = /(\\$|\\n)/gm

function match(code) {
  const result = []
  let match
  while (match = pattern1.exec(code)) {
    match.source = match[1].replace(replacer1, '$2')
    result.push(match)
  }
  while (match = pattern2.exec(code)) {
    match.source = match[2].replace(replacer2, '')
    result.push(match)
  }
  result.sort((a, b) => b.index - a.index)
  return result
}

function minify(glsl) {
  return new Promise((resolve, reject) => {
    let result = ''
    const stream = new Readable()
    stream
      .pipe(tokenizer())
      .pipe(parser())
      .pipe(deparser(false))
      .on('data', buffer => result += buffer.toString())
      .on('end', () => resolve(result))
    stream.push(glsl)
    stream.push(null)
  })
}

function replace(source, start, end, replacement) {
  return source.substring(0, start) + replacement + source.substring(end)
}

export default function threeExample(options = {}) {
  const filter = createFilter(options.include || options.exclude)

  return {
    name: 'three-example',

    async transform(code, id) {
      if (!filter(id)) {
        return null
      }
      if (!/node_modules\/three\/examples\/js/.test(id)) {
        return null
      }
      let transformedCode = code
      if (options.minifyShaders) {
        const matches = match(code)
        for (let i = 0; i < matches.length; ++i) {
          const match = matches[i]
          const start = match.index
          const end = match.index + match[0].length
          const minified = await minify(match.source)
          if (!minified) {
            console.warn('Failed to minify shader:', id)
            continue
          }
          transformedCode = replace(
            transformedCode,
            start, end,
            `Shader: \`${minified}\``)
        }
      }
      const intro = `import * as THREE from 'three';`
      return {
        code: `${intro}(function (THREE) { ${transformedCode} })(THREE);`,
        map: { mappings: '' },
      }
    },
  }
}
