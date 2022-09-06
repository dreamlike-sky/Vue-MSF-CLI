// 导入 ejs 库
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// 编译 ejs 模板
const compile = (templateName, data) => {
	const templatePosition = `../templates/${templateName}`
	const templatePath = path.resolve(__dirname, templatePosition)

	return new Promise((resolve, reject) => {
		ejs.renderFile(templatePath, { data }, {}, (err, result) => {
			if (err) {
				console.log(err)
				reject(err)
				return
			}
			resolve(result)
		})
	})
}

// 封装递归创建文件夹的模块
// 例如：C:\A\B\C\D
const createDirSync = (pathName) => {
	// 判断路径最末尾的文件夹是否存在，如果存在返回 true
	// 判断 D 是否存在，存在返回 true
	if (fs.existsSync(pathName)) {
		return true
	} else {
		// 这样子判断如果嵌套的文件夹较多的话会导致代码可读性不高，所以需要进行递归
		// if (fs.existsSync(path.dirname(pathName))) {
		// 	fs.mkdirSync(pathName)
		// } else {
		// 	if (fs.existsSync(path.dirname(path.dirname(pathName)))) {
		// 	} else {
		// 	}
		// }
		// 如果不存在，再判断它的父文件夹是否存在；如果存在，则创建文件夹
		// 如果 D 不存在，再判断 C 是否存在；如果 C 存在，则创建 D 并终止执行
		// 如果 D 不存在，判断 C 也不存在，则递归继续执行 createDirSync，直到返回为 true 结束
		if (createDirSync(path.dirname(pathName))) {
			fs.mkdirSync(pathName)
			return true
		}
	}
}

// 将编译后的内容写入 .vue 文件
// 例如：在写入的时候 path 路径为 C:\A\B\C\D\Hello.vue，包含了 Hello.vue 文件
// 所以在执行过程中会产生报错，可以在 action.js 执行写入操作的时候，先判断是否输入了 dest
const writeToFile = (path, content) => {
	// 1.判断 path 是否存在，如果不存在，则创建对应的文件夹；
	// 2.判断 createDirSync(path) 是否为 true，如果为 true，则进行写入操作
	// 也就是 在 path 存在 或者 不存在但已经创建好 的前提下，进行写入操作
	// if (createDirSync(path)) {
	return fs.promises.writeFile(path, content)
	// }
}

module.exports = {
	compile,
	writeToFile,
	createDirSync
}