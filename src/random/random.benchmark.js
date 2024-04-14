const { benchmark } = require('@kmamal/benchmarking')
const { uniform } = require('./uniform')

benchmark("random :: uniform", {
	cases: {
		"@kmamal/random/uniform": () => {
			uniform()
		},
		"Math.random": () => {
			Math.random()
		},
	},
	time: 1e3,
})
