const { clone } = require('./clone')
const { __makeSteps, __get, __set } = require('./accessors')

const unwindWith = (obj, path, fnClone) => {
	const steps = __makeSteps(path)
	const arr = __get(obj, steps)
	const { length } = arr
	const res = new Array(length)

	__set(obj, steps, null)
	try {
		for (let i = 0; i < length; i++) {
			const cloned = fnClone(obj)
			__set(cloned, steps, arr[i])
			res[i] = cloned
		}
	}
	finally { __set(obj, steps, arr) }

	return res
}

const unwind = (obj, path) => unwindWith(obj, path, clone)

module.exports = {
	unwindWith,
	unwind,
}
