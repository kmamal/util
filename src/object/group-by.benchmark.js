const { benchmark } = require('@kmamal/benchmarking')
const { groupBy } = require('./group-by')

benchmark("array :: groupBy", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"@kmamal/array/groupBy": (a) => {
			const _ = groupBy(a, (x) => x % 5)
		},
		"Object.groupBy": (a) => {
			const _ = Object.groupBy(a, (x) => x % 5)
		},
	},
	time: 1e2,
})
