#!/usr/bin/env node
// console.log("Welcome to msf!")

// 导入 Commander 帮助系统库
const program = require('commander')

// 导入封装的帮助和可选信息的方法
const helpOptions = require('./lib/core/help')

// 导入封装的创建项目指令的方法
const createCommands = require('./lib/core/create')

// 查看版本号
// program.version('1.0.0')
program.version(require('./package.json').version, '-v, --version')

// 增加自己的 options 可选参数
// program.option('-d, --dest <dest>', 'a destination folder,for instance,-d /src/components')
// program.option('-f, --framework <framework>', 'your framework')
// program.on('--help', function () {
// 	console.log("")
// 	console.log("Other:")
// 	console.log("  other options-")
// })

// 帮助和可选信息
helpOptions()

// 使用创建项目指令的方法
createCommands()

// 解析终端指令
program.parse(process.argv)