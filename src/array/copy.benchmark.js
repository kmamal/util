const { benchmark } = require('@kmamal/benchmarking')
const { copy, __copyInplace } = require('./copy')

benchmark("array :: copy", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"@kmamal/array/copy": (a) => {
			const b = []
			copy.$$$(b, a)
		},
		"Array.prototype.splice": (a) => {
			const b = []
			b.splice(0, 0, ...a)
		},
	},
	time: 1e2,
})

benchmark("array :: copy - with indexes", {
	pre: () => [
		Array.from({ length: 1000 }, (_, i) => i),
		Array.from({ length: 1000 }, (_, i) => i),
	],
	cases: {
		"@kmamal/array/copy": ([ a, b ]) => {
			copy.$$$(b, a, 200, 700, 200)
		},
		"Array.prototype.splice": ([ a, b ]) => {
			b.splice(500, 200, ...a.slice(200, 700))
		},
	},
	time: 1e2,
})

benchmark("array :: copy - within", {
	pre: () => Array.from({ length: 1000 }, () => 1),
	cases: {
		"@kmamal/array/copy": (a) => {
			__copyInplace(a, 0, 200, 700)
			__copyInplace(a, 500, 200, 700)
		},
		"Array.prototype.copyWithin": (a) => {
			a.copyWithin(0, 200, 700)
			a.copyWithin(500, 200, 700)
		},
	},
	time: 1e2,
})
