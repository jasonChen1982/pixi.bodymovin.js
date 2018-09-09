
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'umd',
      name: 'PIXI',
      extend: true,
      globals: {
        'pixi.js': 'PIXI',
      },
      sourcemap: true,
      file: 'build/index.js',
    },
    {
      name: 'PIXI',
      extend: true,
      globals: {
        'pixi.js': 'PIXI',
      },
      sourcemap: true,
      format: 'es',
      file: 'build/index.module.js',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [[ '@babel/preset-env', { modules: false }]],
      plugins: [ '@babel/plugin-external-helpers', '@babel/plugin-proposal-object-rest-spread' ],
    }),
  ],
  external: [ 'pixi.js' ],
  watch: {
    exclude: [ 'node_modules/**' ],
  },
};
