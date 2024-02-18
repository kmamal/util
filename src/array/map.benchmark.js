const { benchmark } = require('@kmamal/benchmarking')
const { map } = require('./map')

benchmark("array :: map", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"@kmamal/array/map": (a) => {
			const _ = map(a, (x) => x * 2)
		},
		"Array.prototype.map": (a) => {
			const _ = a.map((x) => x * 2)
		},
	},
	time: 1e2,
})
