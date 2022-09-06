// promisefy 可以将 download-git-repo 库中的回调函数转换成 Promise 的形式
// 原理：将 download-git-repo 库中的回调函数整个包裹着 Promise，回调函数拿到结果后，
// 			有 err 就调用 Promise 的 reject，没有 err 就调用 Promise 的 resolve。
// 导入 Nodejs 中存在 promisefy 解决不支持 Promise 的问题
const { promisify } = require('util')  // 1.内置模块

// 导入 download-git-repo 库帮助从代码仓库中下载模板
// const download = require('download-git-repo') // 不支持 Promise
const download = promisify(require('download-git-repo')) // 支持 Promise  // 2.第三方的模块

// 导入单独封装的地址，解决地址可能存在变动的问题
const { vueRepo } = require('../config/repo-config')    // 3.自己封装的模块

// 导入单独封装的终端执行命令的方法
const { commandSpawn } = require('../utils/terminal')    // 3.自己封装的模块

// 导入 open 库，帮助我们打开浏览器，这里 open 是一个函数
const open = require('open')  // 2.第三方的模块

// 导入单独封装的编译模板的方法 // 导入写入文件夹的方法 // 导入封装的创建文件夹模块
const { compile, writeToFile, createDirSync } = require('../utils/utils')    // 3.自己封装的模块

const path = require('path')



/**
 * createProjectAction
 * 封装执行 create 命令要做的事情
 */
// 这种处理方式依然不够优雅
// const createProjectAction = (project) => {
// 	// 1. clone 项目
// download(...).then(res => {
// 	return // 这里依然是一个回调
// }).catch(err => {
// })
// }
// 解决办法 async...await
// async...await 理解： Promise 的语法糖，async 函数本身的返回值就是一个 Promise，通过 await 拿结果，从异步转为同步
// callback --> promisify(函数) --> Promise --> async await
const createProjectAction = async (project) => {
	console.log("  Why helps you create your project~")
	// 1. clone 项目
	// 使用 async...await 的前提是 async 函数最终要返回的是一个 Promise
	await download(vueRepo, project, { clone: true })

	// 2.执行 npm install
	const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
	await commandSpawn(command, ['install'], { cwd: `./${project}` })

	// 3.运行 npm run serve
	// await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
	commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

	// 4.打开浏览器
	open("http://localhost:8081/")
}

/**
 * addComponentAction
 * 添加组件要做的事
 * .ejs 为代码模板文件，可以转换为 .vue 的文件
 */
const addComponentAction = async (name, dest) => {
	// 1.有对应的 .ejs 模板
	// 2.编译 .ejs 模板 result
	const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() })
	// console.log(result)
	// 3.将 result 写入到 .vue 文件中
	if (createDirSync(dest)) {
		const tergetPath = path.resolve(dest, `${name}.vue`)
		// console.log(tergetPath)
		writeToFile(tergetPath, result)
	}
}

/**
 * addPageAndRouteAction
 * 添加组件和路由
 */
const addPageAndRouteAction = async (name, dest) => {
	// 1.有对应的 .ejs 模板
	// 2.编译 .ejs 模板
	const data = { name, lowerName: name.toLowerCase() }
	const pageResult = await compile("vue-component.ejs", data)
	const routeResult = await compile("vue-router.ejs", data)
	// 3.写入到对应文件中
	if (createDirSync(dest)) {
		const targetPagePath = path.resolve(dest, `${name}.vue`)
		const targetRoutePath = path.resolve(dest, 'router.js')
		writeToFile(targetPagePath, pageResult)
		writeToFile(targetRoutePath, routeResult)
	}
}

/**
 * addStoreAction
 */
const addStoreAction = async (name, dest) => {
	// 1.编译的过程
	const storeResult = await compile('vue-store.ejs', {})
	const typesResult = await compile('vue-types.ejs', {})
	// 2.创建文件
	// src/pages/name
	// .toLowerCase() 解决大小写问题
	const targetDest = path.resolve(dest, name.toLowerCase())
	if (createDirSync(targetDest)) {
		const targetStorePath = path.resolve(targetDest, `${name}.js`)
		const targetTypesPath = path.resolve(targetDest, 'types.js')
		writeToFile(targetStorePath, storeResult)
		writeToFile(targetTypesPath, typesResult)
	}
}


module.exports = {
	createProjectAction,
	addComponentAction,
	addPageAndRouteAction,
	addStoreAction
}