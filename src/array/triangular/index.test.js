const { test } = require('@xyz/testing')
const {
	UpperLeft,
	UpperRight,
	LowerLeft,
	LowerRight,
} = require('.')
const { Array2d } = require('../2d')

test('array.triangular.upper-left', (t) => {
	const N = 10
	const a = new UpperLeft(N)
	const b = new Array2d(N, N)

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N - i; j++) {
			a.set(i, j, `${i}_${j}`)
			b.set(i, j, `${i}_${j}`)
		}
	}

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N - i; j++) {
			t.equal(a.get(i, j), b.get(i, j))
		}
	}
})


test('array.triangular.upper-right', (t) => {
	const N = 10
	const a = new UpperRight(N)
	const b = new Array2d(N, N)

	for (let i = 0; i < N; i++) {
		for (let j = i; j < N; j++) {
			a.set(i, j, `${i}_${j}`)
			b.set(i, j, `${i}_${j}`)
		}
	}

	for (let i = 0; i < N; i++) {
		for (let j = i; j < N; j++) {
			t.equal(a.get(i, j), b.get(i, j))
		}
	}
})


test('array.triangular.lower-left', (t) => {
	const N = 10
	const a = new LowerLeft(N)
	const b = new Array2d(N, N)

	for (let i = 0; i < N; i++) {
		for (let j = 0; j <= i; j++) {
			a.set(i, j, `${i}_${j}`)
			b.set(i, j, `${i}_${j}`)
		}
	}

	for (let i = 0; i < N; i++) {
		for (let j = 0; j <= i; j++) {
			t.equal(a.get(i, j), b.get(i, j))
		}
	}
})


test('array.triangular.lower-right', (t) => {
	const N = 10
	const a = new LowerRight(N)
	const b = new Array2d(N, N)

	for (let i = 0; i < N; i++) {
		for (let j = N - i - 1; j < N; j++) {
			a.set(i, j, `${i}_${j}`)
			b.set(i, j, `${i}_${j}`)
		}
	}

	for (let i = 0; i < N; i++) {
		for (let j = N - i - 1; j < N; j++) {
			t.equal(a.get(i, j), b.get(i, j))
		}
	}
})
