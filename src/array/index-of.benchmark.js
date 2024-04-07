const { benchmark } = require('@kmamal/benchmarking')
const {
	indexOf,
	indexOfSorted,
	indexOfRight,
	indexOfSortedRight,
} = require('./index-of')

const N = 5500
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

benchmark("array :: indexOf", {
	pre: () => {
		const a = Array.from({ length: N }, () => ({}))
		a[i1] = x1
		a[i2] = x2
		a[i3] = x3
		a[i4] = x4
		a[i5] = x5
		return a
	},
	cases: {
		"@kmamal/array/indexOf": (a) => {
			let _
			_ = indexOf(a, x1)
			_ = indexOf(a, x2)
			_ = indexOf(a, x3)
			_ = indexOf(a, x4)
			_ = indexOf(a, x5)
		},
		"@kmamal/array/indexOfSorted": (a) => {
			let _
			_ = indexOfSorted(a, x1)
			_ = indexOfSorted(a, x2)
			_ = indexOfSorted(a, x3)
			_ = indexOfSorted(a, x4)
			_ = indexOfSorted(a, x5)
		},
		"Array.prototype.indexOf": (a) => {
			let _
			_ = a.indexOf(x1)
			_ = a.indexOf(x2)
			_ = a.indexOf(x3)
			_ = a.indexOf(x4)
			_ = a.indexOf(x5)
		},
		"@kmamal/array/indexOfRight": (a) => {
			let _
			_ = indexOfRight(a, x1)
			_ = indexOfRight(a, x2)
			_ = indexOfRight(a, x3)
			_ = indexOfRight(a, x4)
			_ = indexOfRight(a, x5)
		},
		"@kmamal/array/indexOfSortedRight": (a) => {
			let _
			_ = indexOfSortedRight(a, x1)
			_ = indexOfSortedRight(a, x2)
			_ = indexOfSortedRight(a, x3)
			_ = indexOfSortedRight(a, x4)
			_ = indexOfSortedRight(a, x5)
		},
		"Array.prototype.lastIndexOf": (a) => {
			let _
			_ = a.lastIndexOf(x1)
			_ = a.lastIndexOf(x2)
			_ = a.lastIndexOf(x3)
			_ = a.lastIndexOf(x4)
			_ = a.lastIndexOf(x5)
		},
	},
	time: 1e3,
})
