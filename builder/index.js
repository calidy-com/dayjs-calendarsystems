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
    const tools = await promisifyReadDir(path.join(__dirname, '../src/calendarUtils'))
    for (const tool of tools) {
      // run builds sequentially to limit RAM usage
      await build(configFactory({
        input: `./src/calendarUtils/${tool}`,
        fileName: `./calendarUtils/${tool}`,
        name: `dayjs_calendarsystems_calendarutils_${formatName(tool)}`
      }))
    }

    const plugins = await promisifyReadDir(path.join(__dirname, '../src/calendarSystems'))
    for (const plugin of plugins) {
      // run builds sequentially to limit RAM usage
      await build(configFactory({
        input: `./src/calendarSystems/${plugin}`,
        fileName: `./calendarSystems/${plugin}`,
        name: `dayjs_calendarsystems_${formatName(plugin)}`
      }))
    }

    build(configFactory({
      input: './src/index.js',
      fileName: './dayjs-calendarsystems.min.js',
      format: 'umd',
      name: 'dayjs_calendarsystems'
    }))

    build(configFactory({
      input: './src/index.js',
      fileName: './dayjs-calendarsystems.esm.min.js',
      format: 'esm'
    }))
    build(configFactory({
      input: './src/index.js',
      fileName: './dayjs-calendarsystems.cjs.min.js',
      format: 'cjs'
    }))
    build(configFactory({
      input: './src/index.js',
      fileName: './dayjs-calendarsystems.umd.min.js',
      format: 'umd',
      name: 'dayjs_calendarsystems'
    }))

    await promisify(ncp)('./types/', './')

  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
})()
