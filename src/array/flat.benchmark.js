const { benchmark } = require('@kmamal/benchmarking')
const { flat } = require('./flat')

benchmark("array :: flat", {
	pre: () => Array.from({ length: 100 }, (_, i) => new Array(i)),
	cases: {
		"@kmamal/array/flat": (a) => {
			const _ = flat(a)
		},
		"Array.prototype.flat": (a) => {
			const _ = a.flat()
		},
	},
	time: 1e3,
})
