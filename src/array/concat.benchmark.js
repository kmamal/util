const { benchmark } = require('@kmamal/benchmarking')
const { concat } = require('./concat')

const shapes = {
	"many small": () => Array.from({ length: 1000 }, () => Array.from({ length: 10 }, (_, i) => i)),
	"few large": () => Array.from({ length: 10 }, () => Array.from({ length: 1000 }, (_, i) => i)),
	"mixed sizes": () => Array.from({ length: 100 }, (_, i) => Array.from({ length: i }, (_, j) => j)),
}

for (const [ name, pre ] of Object.entries(shapes)) {
	benchmark(`array :: concat - ${name}`, {
		pre,
		cases: {
			"@kmamal/array/concat": (a) => {
				const _ = concat(a)
			},
			"@kmamal/array/concat.to": (a) => {
				const _ = concat.to([], a)
			},
			"Array.prototype.concat": (a) => {
				const _ = [].concat(...a)
			},
			"Array.prototype.flat": (a) => {
				const _ = a.flat()
			},
		},
		time: 1e3,
	})
}
