const { benchmark } = require('@kmamal/benchmarking')
const { forEach } = require('./for-each')

benchmark("array :: forEach", {
	pre: () => Array.from({ length: 1000 }, () => 1),
	cases: {
		"@kmamal/array/forEach": (a) => {
			forEach(a, (x) => x)
		},
		"Array.prototype.forEach": (a) => {
			a.forEach((x) => x)
		},
	},
	time: 1e2,
})
