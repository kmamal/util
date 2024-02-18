const { benchmark } = require('@kmamal/benchmarking')
const { copyTo } = require('./copy')

benchmark("object :: copy", {
	pre: () => Object.fromEntries(Array.from({ length: 10 }, (_, i) => [ i, i ])),
	cases: {
		"@kmamal/object/copy": (a) => {
			const b = {}
			copyTo(b, a)
		},
		"Object.assign": (a) => {
			const b = {}
			Object.assign(b, a)
		},
		"Object.spread": (a) => {
			const _ = { ...a }
		},
	},
	time: 1e2,
})
