const { benchmark } = require('@kmamal/benchmarking')
const { reverse } = require('./reverse')

benchmark("array :: reverse", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"@kmamal/array/reverse": (a) => {
			const _ = reverse(a)
		},
		"Array.prototype.toReversed": (a) => {
			const _ = a.toReversed()
		},
		"@kmamal/array/reverse.$$$": (a) => {
			const _ = reverse.$$$(a)
		},
		"Array.prototype.reverse": (a) => {
			const _ = a.reverse()
		},
	},
	time: 1e3,
})
