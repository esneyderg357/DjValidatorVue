import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/DjValidatorVue.min.js',
      format: 'iife',
      name: 'DjValidatorVue',
      globals: {
        vue: 'Vue'
      },
      plugins: [terser()]
    },
    {
      file: 'dist/DjValidatorVue.umd.min.js',
      format: 'umd',
      name: 'DjValidatorVue',
      globals: {
        vue: 'Vue'
      },
      plugins: [terser()]
    },
    {
      file: 'dist/DjValidatorVue.esm.min.js',
      format: 'esm',
      plugins: [terser()]
    }
  ],
  external: ['vue'],
  scripts: {
    build: "rollup -c"
  },
  plugins: [resolve(),vue({css: true,compileTemplate: true}),postcss({extensions: ['.css'],extract: false,minimize: true,use: ['sass']})],
}