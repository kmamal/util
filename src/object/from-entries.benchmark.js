const { benchmark } = require('@kmamal/benchmarking')
const { fromEntries } = require('./from-entries')

benchmark("object :: fromEntries", {
	pre: () => Array.from({ length: 10 }, (_, i) => [ i, i ]),
	cases: {
		"@kmamal/object/fromEntries": (a) => {
			const _ = fromEntries(a)
		},
		"Object.fromEntries": (a) => {
			const _ = Object.fromEntries(a)
		},
	},
	time: 1e2,
})
