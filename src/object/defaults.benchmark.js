const { benchmark } = require('@kmamal/benchmarking')
const { defaults } = require('./defaults')

benchmark("object :: defaults", {
	pre: () => Object.fromEntries(Array.from({ length: 10 }, (_, i) => [ i, i ])),
	cases: {
		"@kmamal/object/defaults": (a) => {
			const b = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [ i * 2, i ]))
			defaults.$$$(b, a)
		},
		"Object.assign": (a) => {
			const b = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [ i * 2, i ]))
			Object.assign(b, a, { ...b })
		},
	},
	time: 1e2,
})
