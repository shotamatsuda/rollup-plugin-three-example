'use strict';

var rollupPluginutils = require('rollup-pluginutils');

// The MIT License

function threeExample(options = {}) {
  const filter = rollupPluginutils.createFilter(options.include || options.exclude);

  return {
    name: 'three-example',

    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      if (!/node_modules\/three\/examples\/js/.test(id)) {
        return null;
      }
      let transformedCode = code;
      const intro = `import * as THREE from 'three';`;
      return {
        code: `${intro}(function (THREE) { ${transformedCode} })(THREE);`,
        map: { mappings: '' }
      };
    }
  };
}

module.exports = threeExample;
