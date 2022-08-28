// promisefy 可以将 download-git-repo 库中的回调函数转换成 Promise 的形式
// 原理：将 download-git-repo 库中的回调函数整个包裹着 Promise，回调函数拿到结果后，
// 			有 err 就调用 Promise 的 reject，没有 err 就调用 Promise 的 resolve。
// 导入 Nodejs 中存在 promisefy 解决不支持 Promise 的问题
const { promisify } = require('util')  // 1.内置模块

// 导入 download-git-repo 库帮助从代码仓库中下载模板
// const download = require('download-git-repo') // 不支持 Promise
const download = promisify(require('download-git-repo')) // 支持 Promise  // 2.第三的模块

// 导入单独封装的地址，解决地址可能存在变动的问题
const { vueRepo } = require('../config/repo-config')    // 3.自己封装的模块

// 导入单独封装的终端执行命令的方法
const { commandSpawn } = require('../utils/terminal')    // 3.自己封装的模块

// 导入 open 库，帮助我们打开浏览器，这里 open 是一个函数
const open = require('open')  // 2.第三的模块

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
	// 1. clone 项目
	// 使用 async...await 的前提是 async 函数最终要返回的是一个 Promise
	await download(vueRepo, project, { clone: true })

	// 2.执行 npm install
	const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
	await commandSpawn('command', ['install'], { cwd: `./${project}` })

	// 3.运行 npm run serve
	// await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
	commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

	// 4.打开浏览器
	open("http://localhost:8080/")
}

module.exports = {
	createProjectAction
}