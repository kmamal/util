const { test } = require('@kmamal/testing')
const {
	UpperLeft,
	UpperRight,
	LowerLeft,
	LowerRight,
} = require('.')
const { Array2d } = require('../2d')

test("array.triangular.upper-left", (t) => {
	const N = 10
	const a = new UpperLeft(N)
	const b = new Array2d(N, N)

	for (let y = 0; y < N; y++) {
		for (let x = 0; x < N - y; x++) {
			a.set(x, y, `${x}_${y}`)
			b.set(x, y, `${x}_${y}`)
		}
	}

	for (let y = 0; y < N; y++) {
		for (let x = 0; x < N - y; x++) {
			t.equal(a.get(x, y), b.get(x, y))
		}
	}
})


test("array.triangular.upper-right", (t) => {
	const N = 10
	const a = new UpperRight(N)
	const b = new Array2d(N, N)

	for (let y = 0; y < N; y++) {
		for (let x = y; x < N; x++) {
			a.set(x, y, `${x}_${y}`)
			b.set(x, y, `${x}_${y}`)
		}
	}

	for (let y = 0; y < N; y++) {
		for (let x = y; x < N; x++) {
			t.equal(a.get(x, y), b.get(x, y))
		}
	}
})


test("array.triangular.lower-left", (t) => {
	const N = 10
	const a = new LowerLeft(N)
	const b = new Array2d(N, N)

	for (let y = 0; y < N; y++) {
		for (let x = 0; x <= y; x++) {
			a.set(x, y, `${x}_${y}`)
			b.set(x, y, `${x}_${y}`)
		}
	}

	for (let y = 0; y < N; y++) {
		for (let x = 0; x <= y; x++) {
			t.equal(a.get(x, y), b.get(x, y))
		}
	}
})


test("array.triangular.lower-right", (t) => {
	const N = 10
	const a = new LowerRight(N)
	const b = new Array2d(N, N)

	for (let y = 0; y < N; y++) {
		for (let x = N - y - 1; x < N; x++) {
			a.set(x, y, `${x}_${y}`)
			b.set(x, y, `${x}_${y}`)
		}
	}

	for (let y = 0; y < N; y++) {
		for (let x = N - y - 1; x < N; x++) {
			t.equal(a.get(x, y), b.get(x, y))
		}
	}
})
