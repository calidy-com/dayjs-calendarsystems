const babel = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')

module.exports = (config) => {
  const { input, fileName, name, format = "umd" } = config
  return {
    input: {
      input,
      external: [
        'dayjs'
      ],
      plugins: [
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled'
        }),
        terser()
      ]
    },
    output: {
      file: fileName,
      format: format,
      name: name || 'dayjs_calendarsystems',
      globals: {
        dayjs: 'dayjs'
      },
      compact: true
    }
  }
}
