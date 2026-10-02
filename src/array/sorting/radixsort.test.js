const { test } = require('@kmamal/testing')
const { testVariants } = require('../../testing/test-variants')
const { junkLongArray } = require('./testing/test-cases-for-unstable-sort')
const { __radixsort, radixsort, radixsortBy } = require('./radixsort')
const { create } = require('../create')
const { sub } = require('../../operators')
const { identity } = require('../../function/identity')
const { MiddleSquareWeyl } = require('../../random/seeded/middle-square-weyl')

const randomUint = (bits) => () => Math.floor(Math.random() * 2 ** bits)

testVariants("array.sorting.radixsort", radixsort, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 1 ]), [ 1 ])
	t.equal(f([ 3, 1, 2, 1, 0 ]), [ 0, 1, 1, 2, 3 ])
	t.equal(f([ 256, 1, 255, 0, 65536 ]), [ 0, 1, 255, 256, 65536 ])
	t.equal(f([ 0xFFFFFFFF, 0x80000000, 0x7FFFFFFF, 0 ]), [ 0, 0x7FFFFFFF, 0x80000000, 0xFFFFFFFF ])
	t.equal(f([ 0x01000000, 0x00010000, 0x00000100, 0x00000001 ]), [ 1, 0x100, 0x10000, 0x1000000 ])

	for (const bits of [ 8, 16, 24, 32 ]) {
		const a = create(1000, randomUint(bits))
		const expected = Array.from(a).sort(sub)
		t.equal(f(a), expected)
	}
}, { dst: junkLongArray })

testVariants("array.sorting.radixsortBy", radixsortBy, (t, f) => {
	t.equal(f([], (x) => x.v), [])
	t.equal(f([ 3, 1, 2 ], (x) => 3 - x), [ 3, 2, 1 ])

	const a = create(1000, (i) => ({ v: Math.floor(Math.random() * 1000), id: i }))
	const expected = Array.from(a).sort((x, y) => x.v - y.v || x.id - y.id)
	t.equal(f(Array.from(a), (x) => x.v), expected)
}, { dst: junkLongArray })

test("array.sorting.__radixsort", (t) => {
	const rng = new MiddleSquareWeyl(3)
	const start = 3

	const check = (values, numBytes, fnMap, expected) => {
		const { length } = values
		const before = [ 'L0', 'L1', 'L2' ]
		const after = [ 'R0', 'R1' ]
		const arr = [ ...before, ...values, ...after ]
		const buffer = create(length + 2, () => 'B')
		const out = __radixsort(arr, start, start + length, buffer, numBytes, fnMap)
		t.ok(out === arr || out === buffer)
		t.equal(arr.slice(0, start), before)
		t.equal(arr.slice(start + length), after)
		t.equal(buffer.slice(length), [ 'B', 'B' ])
		const result = out === arr
			? arr.slice(start, start + length)
			: buffer.slice(0, length)
		t.equal(result, expected)
	}

	for (const numBytes of [ 1, 2, 3, 4 ]) {
		for (const length of [ 0, 1, 2, 5, 100 ]) {
			const values = create(length, () => Math.floor(rng.uniform() * 2 ** (8 * numBytes)))
			check(values, numBytes, identity, Array.from(values).sort(sub))
		}
	}

	check([ 3, 1, 2 ], 4, identity, [ 1, 2, 3 ])
	check([ 0x300, 0x100, 0x200 ], 4, identity, [ 0x100, 0x200, 0x300 ])
	check([ 0, 0, 0 ], 4, identity, [ 0, 0, 0 ])
	check([ 0x102, 0x201, 0x101 ], 1, identity, [ 0x201, 0x101, 0x102 ])

	const items = create(200, (id) => ({ id, v: Math.floor(rng.uniform() * 600) }))
	const expected = Array.from(items).sort((a, b) => a.v - b.v || a.id - b.id)
	check(items, 2, (x) => x.v, expected)
})

test("radixsort nested call in fnMap", (t) => {
	const arr = Array.from({ length: 100 }, (_, i) => ({ k: (i * 37) % 100 }))
	const res = radixsortBy(arr, (x) => {
		radixsort([ 5, 3, 1000, 70000 ])
		return x.k
	})
	t.equal(res.map((x) => x.k), Array.from({ length: 100 }, (_, i) => i))
})
