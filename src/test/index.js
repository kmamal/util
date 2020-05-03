
const report = console.log

let count_tests = 0
let count_failed = 0

const test = async (name, callback) => {
	count_tests += 1

	let error = null
	let time = 500
	let remaining = 0

	try {
		const promise = callback({
			plan: (n) => { remaining = n },
			afterTimeout: (t) => { time = t },
			ok: (value, message) => {
				remaining -= 1
				if (value) { return }
				const err = new Error("not ok")
				err.message = message
				throw err
			},
			assert: (cb, message) => {
				remaining -= 1
				if (cb()) { return }
				const err = new Error("assertion failed")
				err.message = message
				throw err
			},
			fail: (message, info) => {
				const err = new Error("failed")
				err.message = message
				Object.assign(err, info || {})
				throw err
			},
			test,
		})

		if (promise) {
			await Promise.race([
				promise,
				new Promise((resolve, reject) => {
					setTimeout(() => {
						reject(new Error('timeout'))
					}, time)
				}),
			])
		}

		if (remaining > 0) {
			throw new Error('remaining')
		}
	} catch (_error) {
		error = _error
		count_failed += 1
	}

	report(name, error)
}

module.exports = { test }


const Path = require('path')

const [ , , ...paths ] = process.argv

let count_files = 0

for (const path of paths) {
	count_files += 1

	console.group(path)
	require(Path.resolve(path))
	console.groupEnd()
	console.log()
}

console.log(`files: ${count_files}`)
console.log(`tests: ${count_tests}`)
console.log(`failed: ${count_failed}`)
