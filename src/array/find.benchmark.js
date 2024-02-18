const { benchmark } = require('@kmamal/benchmarking')
const { find } = require('./find')

const N = 1000
const i1 = 0
const x1 = {}
const i2 = Math.floor(N * 1 / 4)
const x2 = {}
const i3 = Math.floor(N * 2 / 4)
const x3 = {}
const i4 = Math.floor(N * 3 / 4)
const x4 = {}
const i5 = N - 1
const x5 = {}

benchmark("array :: find", {
	pre: () => {
		const a = Array.from({ length: N }, (_, i) => i)
		a[i1] = x1
		a[i2] = x2
		a[i3] = x3
		a[i4] = x4
		a[i5] = x5
		return a
	},
	cases: {
		"@kmamal/array/find": (a) => {
			let _
			_ = find(a, (x) => x === x1)
			_ = find(a, (x) => x === x2)
			_ = find(a, (x) => x === x3)
			_ = find(a, (x) => x === x4)
			_ = find(a, (x) => x === x5)
		},
		"Array.prototype.find": (a) => {
			let _
			_ = a.find((x) => x === x1)
			_ = a.find((x) => x === x2)
			_ = a.find((x) => x === x3)
			_ = a.find((x) => x === x4)
			_ = a.find((x) => x === x5)
		},
	},
	time: 1e3,
})
