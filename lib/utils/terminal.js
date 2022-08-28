/**
 * 执行终端命令相关的代码
 */
// child_process 子进程的意思
const { spawn } = require('child_process')

// const commandSpawn = (command, args, options) => {
// 	spawn(command, args, options)
// }
const commandSpawn = (...args) => {
	return new Promise((resolve, reject) => {
		// 通过子进程执行终端命令
		const childProcess = spawn(...args)
		// 显示 childProcess 进程中执行命令的过程的打印信息，stdout 标准输出流，stderr 错误信息
		childProcess.stdout.pipe(process.stdout)
		childProcess.stdout.pipe(process.stderr)
		childProcess.on("close", () => {
			resolve()
		})
	})
}

module.exports = {
	commandSpawn
}