const rollup = require('rollup')
const configFactory = require('./rollup.config')
const fs = require('fs')
const util = require('util')
const path = require('path')
const { ncp } = require('ncp')

const { promisify } = util

const promisifyReadDir = promisify(fs.readdir)
const promisifyReadFile = promisify(fs.readFile)
const promisifyWriteFile = promisify(fs.writeFile)

const formatName = n => n.replace(/\.js/, '').replace('-', '_')

async function build(option) {
  const bundle = await rollup.rollup(option.input)
  await bundle.write(option.output)
}

(async () => {
  try {
    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    const tools = await promisifyReadDir(path.join(__dirname, '../src/utils'))
    for (const tool of tools) {
      // run builds sequentially to limit RAM usage
      await build(configFactory({
        input: `./src/utils/${tool}`,
        fileName: `./dist/utils/${tool}.js`,
        name: `dayjs_calendarSystems_utils_${formatName(tool)}`
      }))
    }

    const plugins = await promisifyReadDir(path.join(__dirname, '../src/calendarSystems'))
    for (const plugin of plugins) {
      // run builds sequentially to limit RAM usage
      await build(configFactory({
        input: `./src/calendarSystems/${plugin}`,
        fileName: `./dist/calendarSystems/${plugin}.js`,
        name: `dayjs_calendarSystems_${formatName(plugin)}`
      }))
    }

    build(configFactory({
      input: './src/index.js',
      fileName: './dist/dayjs-calendarsystems.min.js',
      format: 'umd',
      name: 'dayjs_calendarsystems'
    }))

    build(configFactory({
      input: './src/index.js',
      fileName: './dist/dayjs-calendarsystems.esm.js',
      format: 'esm'
    }))
    build(configFactory({
      input: './src/index.js',
      fileName: './dist/dayjs-calendarsystems.cjs.js',
      format: 'cjs'
    }))
    build(configFactory({
      input: './src/index.js',
      fileName: './dist/dayjs-calendarsystems.umd.js',
      format: 'umd',
      name: 'dayjs_calendarsystems'
    }))

    await promisify(ncp)('./types/', './dist')

  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
})()
