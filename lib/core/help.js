const program = require('commander')

const helpOptions = () => {
	// 增加自己的 options 可选参数
	program.option('-d, --dest <dest>', 'a destination folder,for instance,-d /src/components')
	program.option('-f, --framework <framework>', 'your framework')

	program.on('--help', function () {
		console.log("")
		console.log("Other:")
		console.log("  other options-")
	})
}
module.exports = helpOptions