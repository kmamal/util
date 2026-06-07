const Fs = require('node:fs')
const Path = require('node:path')

module.exports = (target, dirname) => {
	for (const name of Fs.readdirSync(dirname)) {
		if (false
			|| !name.endsWith('.js')
			|| name.startsWith('_')
			|| name.endsWith('.test.js')
			|| name === 'index.js'
		) { continue }

		Object.assign(target, require(Path.join(dirname, name)))
	}
}
