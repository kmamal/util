const { benchmark } = require('@kmamal/benchmarking')
const { toEntries } = require('./to-entries')

benchmark("object :: toEntries", {
	pre: () => Object.fromEntries(Array.from({ length: 10 }, (_, i) => [ i, i ])),
	cases: {
		"@kmamal/object/toEntries": (a) => {
			const _ = toEntries(a)
		},
		"Object.entries": (a) => {
			const _ = Object.entries(a)
		},
	},
	time: 1e2,
})
