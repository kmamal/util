const { test } = require('@kmamal/testing')
const {
	__initExponentialSearch,
	__expandExponentialSearch,
	__contractExponentialSearch,
	exponentialSearch,
	exponentialSearchFirst,
	exponentialSearchLast,
	exponentialSearchBy,
	exponentialSearchFirstBy,
	exponentialSearchLastBy,
} = require('./exponential')
const { compare } = require('../../function/compare')

test("array.exponentialSearch", (t) => {
	t.equal(exponentialSearch([], 0), 0)
	t.equal(exponentialSearch([ 1 ], 0), 0)
	t.equal(exponentialSearch([ 1 ], 1), 0)
	t.equal(exponentialSearch([ 1 ], 2), 1)
	t.equal(exponentialSearch([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearch([ 1, 2, 3 ], 1), 0)
	t.equal(exponentialSearch([ 1, 2, 3 ], 2), 1)
	t.equal(exponentialSearch([ 1, 2, 3 ], 3), 2)
	t.equal(exponentialSearch([ 1, 2, 3 ], 4), 3)
})

test("array.exponentialSearchFirst", (t) => {
	t.equal(exponentialSearchFirst([], 0), 0)
	t.equal(exponentialSearchFirst([ 1 ], 0), 0)
	t.equal(exponentialSearchFirst([ 1 ], 1), 0)
	t.equal(exponentialSearchFirst([ 1 ], 2), 1)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 1), 0)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 2), 1)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 3), 2)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 4), 3)
	t.equal(exponentialSearchFirst([ 2, 2, 2 ], 2), 0)
})

test("array.exponentialSearchLast", (t) => {
	t.equal(exponentialSearchLast([], 0), 0)
	t.equal(exponentialSearchLast([ 1 ], 0), 0)
	t.equal(exponentialSearchLast([ 1 ], 1), 1)
	t.equal(exponentialSearchLast([ 1 ], 2), 1)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 1), 1)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 2), 2)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 3), 3)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 4), 3)
	t.equal(exponentialSearchLast([ 2, 2, 2 ], 2), 3)
})

test("array.exponentialSearchBy", (t) => {
	t.equal(exponentialSearchBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test("array.exponentialSearchFirstBy", (t) => {
	t.equal(exponentialSearchFirstBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchFirstBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.exponentialSearchLastBy", (t) => {
	t.equal(exponentialSearchLastBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLastBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLastBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchLastBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchLastBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})

test("array.__initExponentialSearch", (t) => {
	t.equal(__initExponentialSearch(2, 9, 1), {
		first: 2,
		last: 9,
		a: 2,
		b: null,
		mid: null,
		prev: 2,
		step: 1,
		sign: 1,
	})
	t.equal(__initExponentialSearch(9, 2, -1), {
		first: 9,
		last: 2,
		a: 9,
		b: null,
		mid: null,
		prev: 9,
		step: -1,
		sign: -1,
	})
})

test("array.__expandExponentialSearch", (t) => {
	{
		const state = __initExponentialSearch(2, 9, 1)
		t.equal(__expandExponentialSearch(state, 1), false)
		t.equal([ state.prev, state.a, state.step ], [ 2, 3, 2 ])
		t.equal(__expandExponentialSearch(state, 1), false)
		t.equal([ state.prev, state.a, state.step ], [ 3, 5, 4 ])
		t.equal(__expandExponentialSearch(state, 1), false)
		t.equal([ state.prev, state.a, state.step ], [ 5, 9, 8 ])
		t.equal(__expandExponentialSearch(state, -1), true)
		t.equal([ state.a, state.b, state.mid ], [ 5, 9, 7 ])
	}

	{
		const state = __initExponentialSearch(2, 4, 1)
		t.equal(__expandExponentialSearch(state, 1), false)
		t.equal(__expandExponentialSearch(state, 1), false)
		t.equal(state.a, 4)
		t.equal(__expandExponentialSearch(state, 1), true)
		t.equal([ state.a, state.b ], [ 4, null ])
	}

	{
		const state = __initExponentialSearch(2, 9, 1)
		t.equal(__expandExponentialSearch(state, -1), true)
		t.equal([ state.a, state.b ], [ 2, null ])
	}

	{
		const state = __initExponentialSearch(9, 2, -1)
		t.equal(__expandExponentialSearch(state, -1), false)
		t.equal([ state.prev, state.a, state.step ], [ 9, 8, -2 ])
		t.equal(__expandExponentialSearch(state, -1), false)
		t.equal([ state.prev, state.a, state.step ], [ 8, 6, -4 ])
		t.equal(__expandExponentialSearch(state, -1), false)
		t.equal([ state.prev, state.a, state.step ], [ 6, 2, -8 ])
		t.equal(__expandExponentialSearch(state, -1), true)
		t.equal([ state.a, state.b ], [ 2, null ])
	}

	{
		const state = __initExponentialSearch(9, 2, -1)
		__expandExponentialSearch(state, -1)
		__expandExponentialSearch(state, -1)
		t.equal(__expandExponentialSearch(state, 1), true)
		t.equal([ state.a, state.b, state.mid ], [ 8, 6, 7 ])
	}
})

test("array.__contractExponentialSearch", (t) => {
	{
		const state = { ...__initExponentialSearch(2, 9, 1), a: 5, b: 9, mid: 7 }
		t.equal(__contractExponentialSearch(state, -1), false)
		t.equal([ state.a, state.b, state.mid ], [ 5, 6, 5 ])
		t.equal(__contractExponentialSearch(state, 1), false)
		t.equal([ state.a, state.b, state.mid ], [ 6, 6, 6 ])
		t.equal(__contractExponentialSearch(state, 1), true)
		t.equal([ state.a, state.b ], [ 7, 6 ])
	}

	{
		const state = { ...__initExponentialSearch(9, 2, -1), a: 8, b: 6, mid: 7 }
		t.equal(__contractExponentialSearch(state, 1), false)
		t.equal([ state.a, state.b, state.mid ], [ 8, 8, 8 ])
		t.equal(__contractExponentialSearch(state, -1), true)
		t.equal([ state.a, state.b ], [ 7, 8 ])
	}
})

test("array.__expandExponentialSearch.__contractExponentialSearch.range", (t) => {
	const search = (arr, first, last, sign, x) => {
		const state = __initExponentialSearch(first, last, sign)
		let cmp
		for (;;) {
			cmp = compare(x, arr[state.a])
			if (cmp === 0) { return state.a }
			if (__expandExponentialSearch(state, cmp)) { break }
		}
		if (state.b === null) {
			return cmp * sign > 0 ? state.a + sign : state.a
		}
		for (;;) {
			cmp = compare(x, arr[state.mid])
			if (cmp === 0) { return state.mid }
			if (__contractExponentialSearch(state, cmp)) { return state.a }
		}
	}

	const arr = [ 100, 100, 1, 3, 5, 7, 9, 11, 13, 15, 17, -100, -100 ]
	const start = 2
	const end = 11
	for (let x = 0; x <= 18; x++) {
		let expected = start
		while (expected < end && arr[expected] < x) { expected++ }
		const forward = search(arr, start, end - 1, 1, x)
		const backward = search(arr, end - 1, start, -1, x)
		if (x % 2 === 1) {
			t.equal(arr[forward], x)
			t.equal(arr[backward], x)
		}
		else {
			t.equal(forward, expected)
			t.equal(backward + 1, expected)
		}
	}
})
