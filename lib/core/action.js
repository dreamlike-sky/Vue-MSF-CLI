// promisefy 可以将 download-git-repo 库中的回调函数转换成 Promise 的形式
// 原理：将 download-git-repo 库中的回调函数整个包裹着 Promise，回调函数拿到结果后，
// 			有 err 就调用 Promise 的 reject，没有 err 就调用 Promise 的 resolve。
// 导入 Nodejs 中存在 promisefy 解决不支持 Promise 的问题
const { promisify } = require('util')

// 导入 download-git-repo 库帮助从代码仓库中下载模板
// const download = require('download-git-repo') // 不支持 Promise
const download = promisify(require('download-git-repo')) // 支持 Promise

// 导入单独封装的地址，解决地址可能存在变动的问题
const { vueRepo } = require('../config/repo-config')

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
	await download()

	// 2.执行 npm install
	// 3.运行 npm run serve
	// 4.打开浏览器
}

module.exports = {
	createProjectAction
}