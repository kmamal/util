const { benchmark } = require('@kmamal/benchmarking')
const { filter } = require('./filter')

benchmark("array :: filter", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"@kmamal/array/filter": (a) => {
			const _ = filter(a, (x) => x % 2 === 0)
		},
		"Array.prototype.filter": (a) => {
			const _ = a.filter((x) => x % 2 === 0)
		},
	},
	time: 1e2,
})
