const { benchmark } = require('@kmamal/benchmarking')
const { random } = require('./random')

benchmark("ransom :: random", {
	cases: {
		"@kmamal/random/uniform": () => {
			random()
		},
		"Math.random": () => {
			Math.random()
		},
	},
	time: 1e3,
})
