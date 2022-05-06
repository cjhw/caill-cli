const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const prompt = require('../inquirer/inquirer.js')
const { vueRepo } = require('../config/repo-config.js')
const { commandSpawn } = require('../utlis/terminal')
const { compile, writeToFile, createDirSync } = require('../utlis/utils')

const createProjectAction = (project) => {
  prompt()
    .then(async (answer) => {
      if (answer.framework === 1) {
        console.log('cai-cli help you create your project...')
        // 1.clone项目
        await download(vueRepo, project, { clone: true })
        // 2.执行npm install
        //没有这个windows会报错
        const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
        await commandSpawn(command, ['install'], { cwd: `./${project}` })
        // 3.执行npm run dev
        commandSpawn(command, ['run', 'dev'], { cwd: `./${project}` })
        // 4.打开浏览器
        open('http://localhost:8080')
      } else if (answer.framework === 2) {
        console.log('cai-cli help you create your project...')
        // 1.clone项目
        await download(vueRepo, project, { clone: true })
        // 2.执行npm install
        //没有这个windows会报错
        const command = process.platform === 'win32' ? 'yarn.cmd' : 'yarn'
        await commandSpawn(command, ['install'], { cwd: `./${project}` })
        // 3.执行npm run dev
        commandSpawn(command, ['start'], { cwd: `./${project}` })
        // 4.打开浏览器 react的webpack自动打开项目
      }
    })
    .catch((error) => {
      console.log(' ~ error', error)
    })
}

// 添加组件的模板
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const data = { name, lowerName: name.toLowerCase() }
  const result = await compile('vue-component.ejs', data)

  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  // console.log(targetPath)
  writeToFile(targetPath, result)
}

// 添加组件和路由
const addViewAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const viewResult = await compile('vue-component.ejs', data)
  const routeResult = await compile('vue-router.ejs', data)

  // 2.写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase())
  console.log(targetDest)
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.ts')
    writeToFile(targetPagePath, viewResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

const addStoreAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const storeResult = await compile('vue-store.ejs', data)
  // 2.写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.ts`)
    writeToFile(targetStorePath, storeResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addViewAndRouteAction,
  addStoreAction,
}
