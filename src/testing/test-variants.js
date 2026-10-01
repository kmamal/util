const { test } = require('@kmamal/testing')

const JUNK = Symbol('junk')

const junkArray = () => [ JUNK, JUNK, JUNK, JUNK, JUNK, JUNK, JUNK, JUNK ]
const junkObject = () => ({ junk: JUNK })
const junkSet = () => new Set([ JUNK ])
const junkMap = () => new Map([ [ JUNK, JUNK ] ])

const _isObject = (x) => x !== null && typeof x === 'object'

const testVariants = (name, fn, callback, options = {}) => {
	const {
		base = fn,
		to = fn.to,
		$$$ = fn.$$$,
		dst: createDst = junkArray,
	} = options

	if (base === undefined) { throw new Error(`${name}: missing base variant`) }
	if (to === undefined) { throw new Error(`${name}: missing .to variant`) }
	if ($$$ === undefined) { throw new Error(`${name}: missing .$$$ variant`) }

	if (base !== null) {
		test(name, (t) => callback(t, (...args) => {
			const res = base(...args)
			if (_isObject(res) && args.includes(res)) {
				t.fail({ reason: "returned an argument instead of a new object", args, res })
			}
			return res
		}))
	}

	if (to !== null) {
		test(`${name}.to`, (t) => callback(t, (...args) => {
			const dst = createDst()
			const res = to(dst, ...args)
			if (res !== dst) {
				t.fail({ reason: "did not return dst", args, res })
			}
			return res
		}))
	}

	if ($$$ !== null) {
		test(`${name}.$$$`, (t) => callback(t, (...args) => {
			const res = $$$(...args)
			if (res !== args[0]) {
				t.fail({ reason: "did not return its first argument", args, res })
			}
			return res
		}))
	}
}

module.exports = {
	JUNK,
	junkArray,
	junkObject,
	junkSet,
	junkMap,
	testVariants,
}
