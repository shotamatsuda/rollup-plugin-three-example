// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { createFilter } from 'rollup-pluginutils'

export default function threeExample (options = {}) {
  const filter = createFilter(options.include || options.exclude)

  return {
    name: 'three-example',

    async transform (code, id) {
      if (!filter(id)) {
        return null
      }
      if (!/node_modules\/three\/examples\/js/.test(id)) {
        return null
      }
      let transformedCode = code
      const intro = `import * as THREE from 'three';`
      return {
        code: `${intro}(function (THREE) { ${transformedCode} })(THREE);`,
        map: { mappings: '' }
      }
    }
  }
}
