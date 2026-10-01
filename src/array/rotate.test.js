const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __rotate, __rotateInplace, rotate } = require('./rotate')

testVariants("array.rotate", rotate, (t, f) => {
	t.equal(f([], -2), [])
	t.equal(f([], 0), [])
	t.equal(f([], 2), [])
	t.equal(f([ 1 ], -2), [ 1 ])
	t.equal(f([ 1 ], 0), [ 1 ])
	t.equal(f([ 1 ], 2), [ 1 ])
	t.equal(f([ 1, 2 ], -2), [ 1, 2 ])
	t.equal(f([ 1, 2 ], 0), [ 1, 2 ])
	t.equal(f([ 1, 2 ], 2), [ 1, 2 ])
	t.equal(f([ 1, 2, 3 ], -2), [ 3, 1, 2 ])
	t.equal(f([ 1, 2, 3 ], 0), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], 2), [ 2, 3, 1 ])
	t.equal(f([ 1, 2, 3, 4 ], -2), [ 3, 4, 1, 2 ])
	t.equal(f([ 1, 2, 3, 4 ], 0), [ 1, 2, 3, 4 ])
	t.equal(f([ 1, 2, 3, 4 ], 2), [ 3, 4, 1, 2 ])
})

test("array.__rotate", (t) => {
	const src = [ 'x', 1, 2, 3, 4, 5, 'x' ]
	for (let n = -7; n <= 7; n++) {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]
		__rotate(dst, 2, src, 1, 6, n)
		t.equal(dst, [ 'y', 'y', ...rotate(src.slice(1, 6), n), 'y' ], { n })
	}
	t.equal(src, [ 'x', 1, 2, 3, 4, 5, 'x' ])

	const known = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
	__rotate(known, 1, src, 1, 5, 1)
	t.equal(known, [ 'y', 4, 1, 2, 3, 'y' ])

	const single = [ 'y', 'y', 'y' ]
	__rotate(single, 1, src, 3, 4, 2)
	t.equal(single, [ 'y', 3, 'y' ])

	const empty = [ 'y', 'y' ]
	__rotate(empty, 1, src, 3, 3, 2)
	t.equal(empty, [ 'y', 'y' ])
})

test("array.__rotateInplace", (t) => {
	for (const length of [ 2, 3, 4, 5 ]) {
		const range = Array.from({ length }, (_, i) => i + 1)
		for (let n = -7; n <= 7; n++) {
			const arr = [ 'x', ...range, 'x' ]
			__rotateInplace(arr, 1, length + 1, n, [])
			t.equal(arr, [ 'x', ...rotate(range, n), 'x' ], { length, n })
		}
	}

	const known = [ 'x', 1, 2, 3, 4, 5, 'x' ]
	__rotateInplace(known, 1, 6, 2, [])
	t.equal(known, [ 'x', 4, 5, 1, 2, 3, 'x' ])

	const single = [ 'x', 1, 'x' ]
	__rotateInplace(single, 1, 2, 1, [])
	t.equal(single, [ 'x', 1, 'x' ])

	const empty = [ 'x', 'x' ]
	__rotateInplace(empty, 1, 1, 1, [])
	t.equal(empty, [ 'x', 'x' ])
})
