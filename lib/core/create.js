const program = require('commander')

// 导入封装的 action 的方法
const {
	createProjectAction,
} = require('./action')

const createCommands = () => {
	program
		// 创建 create 命令
		.command('create <project> [others...]')
		// 创建 create 命令描述
		.description('clone a repository into a folder')
		// 创建执行 create 命令要做的事情
		// 这样做当创建的命令多起来的时候回调就会变多，可读性变差，
		// .action((project, others) => {
		// 	console.log(project, others)
		// })
		// 因此进行了单独的封装
		.action(createProjectAction)
}

module.exports = createCommands