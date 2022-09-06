const program = require('commander')

// 导入封装的 action 的方法
const {
	createProjectAction,
	addComponentAction,
	addPageAndRouteAction,
	addStoreAction
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

	program
		// 创建 addcpn 命令
		.command('addcpn <name>')
		// 创建 addcpn 命令描述
		.description('add vue component,for instance,msf addcpn HelloWorld [-d lib/components]')
		// 创建执行 addcpn 命令要做的事情(单独封装)
		// .action(addComponentAction)
		.action((name) => {
			addComponentAction(name, program.dest || 'lib/components')
		})

	program
		// 创建 addpage 命令
		.command('addpage <page>')
		// 创建 addpage 命令描述
		.description('add vue page,for instance,msf addpage Home [-d lib/pages]')
		// 创建执行 addpage 命令要做的事情(单独封装)
		// .action(addComponentAction)
		.action((page) => {
			addPageAndRouteAction(page, program.dest || 'lib/pages')
		})

	program
		// 创建 addstore 命令
		.command('addstore <store>')
		// 创建 addstore 命令描述
		.description('add vue store,for instance,msf addstore audio [-d lib/pages]')
		// 创建执行 addstore 命令要做的事情(单独封装)
		// .action(addStoreAction)
		.action((store) => {
			addStoreAction(store, program.dest || 'lib/store/modules')
		})
}

module.exports = createCommands