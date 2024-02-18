const { benchmark } = require('@kmamal/benchmarking')
const { includes, includesSorted } = require('./includes')

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

benchmark("array :: includes", {
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
		"@kmamal/array/includes": (a) => {
			let _
			_ = includes(a, x1)
			_ = includes(a, x2)
			_ = includes(a, x3)
			_ = includes(a, x4)
			_ = includes(a, x5)
		},
		"@kmamal/array/includesSorted": (a) => {
			let _
			_ = includesSorted(a, x1)
			_ = includesSorted(a, x2)
			_ = includesSorted(a, x3)
			_ = includesSorted(a, x4)
			_ = includesSorted(a, x5)
		},
		"Array.prototype.includes": (a) => {
			let _
			_ = a.includes(x1)
			_ = a.includes(x2)
			_ = a.includes(x3)
			_ = a.includes(x4)
			_ = a.includes(x5)
		},
	},
	time: 1e3,
})
