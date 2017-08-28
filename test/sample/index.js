import * as THREE from 'three'
import 'three/examples/js/postprocessing/EffectComposer'
import 'three/examples/js/shaders/LuminosityHighPassShader'
import 'three/examples/js/postprocessing/OutlinePass'

export default {
  EffectComposer: THREE.EffectComposer,
  LuminosityHighPassShader: THREE.LuminosityHighPassShader,
  OutlinePass: THREE.OutlinePass,
}
