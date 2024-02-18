const { benchmark } = require('@kmamal/benchmarking')
const { reduce } = require('./reduce')

benchmark("array :: reduce", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"@kmamal/array/reduce": (a) => {
			const _ = reduce(a, (x, y) => x + y)
		},
		"Array.prototype.reduce": (a) => {
			const _ = a.reduce((x, y) => x + y)
		},
	},
	time: 1e3,
})
