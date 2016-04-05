import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.es6.js',
  format: 'cjs',
  plugins: [ babel() ],
  dest: 'index.js'
};
