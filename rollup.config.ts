import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/public-api.ts',
  output: [
    {
      file: './bundles/index.js',
      format: 'umd',
      name: 'colorPicker',
      sourcemap: false
    },
    {
      file: './bundles/index.esm.js',
      format: 'esm',
      sourcemap: false
    }
  ],
  plugins: [
    typescript(),
    postcss({
      extract: true
    }),
    copy({
      targets: [{
        src: ['./src/assets'],
        dest: 'bundles'
      }]
    })
  ]
}
