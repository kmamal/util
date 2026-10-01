const { test } = require('@kmamal/testing')
const { __comm, comm, commBy } = require('./comm')

test("array.comm", (t) => {
	t.equal(comm([], []), { a: [], ab: [], b: [], x: [] })
	t.equal(comm([ 1 ], []), { a: [ 1 ], ab: [], b: [], x: [ 1 ] })
	t.equal(comm([], [ 1 ]), { a: [], ab: [], b: [ 1 ], x: [ 1 ] })
	t.equal(comm([ 1 ], [ 1 ]), { a: [], ab: [ 1 ], b: [], x: [] })
	t.equal(comm([ 1 ], [ 2 ]), { a: [ 1 ], ab: [], b: [ 2 ], x: [ 1, 2 ] })
	t.equal(comm([ 1, 2, 3 ], []), { a: [ 1, 2, 3 ], ab: [], b: [], x: [ 1, 2, 3 ] })
	t.equal(comm([], [ 1, 2, 3 ]), { a: [], ab: [], b: [ 1, 2, 3 ], x: [ 1, 2, 3 ] })
	t.equal(comm([ 1, 2, 3 ], [ 2, 3, 4 ]), { a: [ 1 ], ab: [ 2, 3 ], b: [ 4 ], x: [ 1, 4 ] })
})

test("array.commBy", (t) => {
	t.equal(commBy([], [], (x) => 2 * x), { a: [], ab: [], b: [], x: [] })
	t.equal(commBy([ 1 ], [], (x) => 2 * x), { a: [ 1 ], ab: [], b: [], x: [ 1 ] })
	t.equal(commBy([], [ 1 ], (x) => 2 * x), { a: [], ab: [], b: [ 1 ], x: [ 1 ] })
	t.equal(commBy([ 1 ], [ 1 ], (x) => 2 * x), { a: [], ab: [ 1 ], b: [], x: [] })
	t.equal(commBy([ 1 ], [ 2 ], (x) => 2 * x), { a: [ 1 ], ab: [], b: [ 2 ], x: [ 1, 2 ] })
	t.equal(commBy([ 1, 2, 3 ], [], (x) => 2 * x), { a: [ 1, 2, 3 ], ab: [], b: [], x: [ 1, 2, 3 ] })
	t.equal(commBy([], [ 1, 2, 3 ], (x) => 2 * x), { a: [], ab: [], b: [ 1, 2, 3 ], x: [ 1, 2, 3 ] })
	t.equal(commBy([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), { a: [ 1 ], ab: [ 2, 3 ], b: [ 4 ], x: [ 1, 4 ] })
})

test("array.commBy grouping", (t) => {
	t.equal(
		commBy([ 1, 12, 25 ], [ 15, 23, 31 ], (x) => Math.floor(x / 10)),
		{ a: [ 1 ], ab: [ 12, 25 ], b: [ 31 ], x: [ 1, 31 ] },
	)
})

test("array.comm duplicates", (t) => {
	t.equal(comm([ 1, 1, 2 ], [ 1 ]), { a: [ 2 ], ab: [ 1, 1 ], b: [], x: [ 2 ] })
	t.equal(comm([ 1 ], [ 1, 1, 2 ]), { a: [], ab: [ 1 ], b: [ 2 ], x: [ 2 ] })
	t.equal(comm([ 1, 2, 2, 4 ], [ 2, 2, 2, 3, 3 ]), { a: [ 1, 4 ], ab: [ 2, 2 ], b: [ 3, 3 ], x: [ 1, 3, 3, 4 ] })
	t.equal(
		commBy([ 11, 12, 25 ], [ 15, 16, 31 ], (x) => Math.floor(x / 10)),
		{ a: [ 25 ], ab: [ 11, 12 ], b: [ 31 ], x: [ 25, 31 ] },
	)
})

test("array.__comm", (t) => {
	const cmp = (x, y) => x - y
	const fill = (n) => new Array(n).fill('x')

	{
		const a = [ 'p', 1, 2, 2, 4, 6, 'q' ]
		const b = [ 'r', 'r', 2, 3, 6, 7, 's' ]
		const dstA = fill(4)
		const dstAB = fill(6)
		const dstB = fill(6)
		const dstX = fill(6)
		const lengths = { ...__comm(dstA, 1, dstAB, 2, dstB, 3, dstX, 1, a, 1, 6, b, 2, 6, cmp) }
		t.equal(lengths, { a: 3, ab: 5, b: 5, x: 5 })
		t.equal(dstA, [ 'x', 1, 4, 'x' ])
		t.equal(dstAB, [ 'x', 'x', 2, 2, 6, 'x' ])
		t.equal(dstB, [ 'x', 'x', 'x', 3, 7, 'x' ])
		t.equal(dstX, [ 'x', 1, 3, 4, 7, 'x' ])
		const expected = comm(a.slice(1, 6), b.slice(2, 6))
		t.equal(dstA.slice(1, lengths.a), expected.a)
		t.equal(dstAB.slice(2, lengths.ab), expected.ab)
		t.equal(dstB.slice(3, lengths.b), expected.b)
		t.equal(dstX.slice(1, lengths.x), expected.x)
		t.equal(a, [ 'p', 1, 2, 2, 4, 6, 'q' ])
		t.equal(b, [ 'r', 'r', 2, 3, 6, 7, 's' ])
	}

	{
		const a = [ 0, 5, 6, 7, 0 ]
		const b = [ 9, 1, 5, 9 ]

		{
			const dstB = fill(3)
			const dstX = fill(5)
			const lengths = { ...__comm(null, 7, null, 8, dstB, 1, dstX, 1, a, 1, 4, b, 1, 3, cmp) }
			t.equal(lengths, { a: 7, ab: 8, b: 2, x: 4 })
			t.equal(dstB, [ 'x', 1, 'x' ])
			t.equal(dstX, [ 'x', 1, 6, 7, 'x' ])
		}

		{
			const dstA = fill(4)
			const dstAB = fill(3)
			const lengths = { ...__comm(dstA, 1, dstAB, 1, null, 0, null, 0, a, 1, 4, b, 1, 3, cmp) }
			t.equal(lengths, { a: 3, ab: 2, b: 0, x: 0 })
			t.equal(dstA, [ 'x', 6, 7, 'x' ])
			t.equal(dstAB, [ 'x', 5, 'x' ])
		}

		{
			const dstA = fill(4)
			const dstX = fill(5)
			const lengths = { ...__comm(dstA, 1, null, 0, null, 0, dstX, 1, a, 1, 4, b, 1, 3, cmp) }
			t.equal(lengths, { a: 3, ab: 0, b: 0, x: 4 })
			t.equal(dstA, [ 'x', 6, 7, 'x' ])
			t.equal(dstX, [ 'x', 1, 6, 7, 'x' ])
		}
	}

	{
		const a = [ 9, 1, 9 ]
		const b = [ 9, 0, 1, 2, 3, 9 ]

		{
			const dstB = fill(5)
			const dstX = fill(5)
			const lengths = { ...__comm(null, 0, null, 0, dstB, 1, dstX, 1, a, 1, 2, b, 1, 5, cmp) }
			t.equal(lengths, { a: 0, ab: 0, b: 4, x: 4 })
			t.equal(dstB, [ 'x', 0, 2, 3, 'x' ])
			t.equal(dstX, [ 'x', 0, 2, 3, 'x' ])
		}

		{
			const dstB = fill(5)
			const dstAB = fill(3)
			const lengths = { ...__comm(null, 0, dstAB, 1, dstB, 1, null, 0, a, 1, 2, b, 1, 5, cmp) }
			t.equal(lengths, { a: 0, ab: 2, b: 4, x: 0 })
			t.equal(dstB, [ 'x', 0, 2, 3, 'x' ])
			t.equal(dstAB, [ 'x', 1, 'x' ])
		}

		{
			const dstX = fill(5)
			const lengths = { ...__comm(null, 0, null, 0, null, 0, dstX, 1, a, 1, 2, b, 1, 5, cmp) }
			t.equal(lengths, { a: 0, ab: 0, b: 0, x: 4 })
			t.equal(dstX, [ 'x', 0, 2, 3, 'x' ])
		}
	}

	{
		const dstAB = fill(4)
		const dstB = fill(3)
		const lengths = { ...__comm(null, 0, dstAB, 1, dstB, 1, null, 0, [ 1, 3 ], 0, 2, [ 1, 1, 1, 3, 3, 4 ], 0, 5, cmp) }
		t.equal(lengths, { a: 0, ab: 3, b: 1, x: 0 })
		t.equal(dstAB, [ 'x', 1, 3, 'x' ])
		t.equal(dstB, [ 'x', 'x', 'x' ])
	}

	{
		const dstA = fill(3)
		const dstAB = fill(3)
		const dstB = fill(3)
		const dstX = fill(4)
		const lengths = { ...__comm(dstA, 1, dstAB, 1, dstB, 1, dstX, 1, [ 1, 5 ], 0, 1, [ 5, 1 ], 0, 1, cmp) }
		t.equal(lengths, { a: 2, ab: 1, b: 2, x: 3 })
		t.equal(dstA, [ 'x', 1, 'x' ])
		t.equal(dstAB, [ 'x', 'x', 'x' ])
		t.equal(dstB, [ 'x', 5, 'x' ])
		t.equal(dstX, [ 'x', 1, 5, 'x' ])
	}

	{
		const dstAB = fill(3)
		const dstA = fill(3)
		const lengths = { ...__comm(dstA, 1, dstAB, 1, null, 0, null, 0, [ 'p', 2, 2, 'q' ], 1, 2, [ 2 ], 0, 1, cmp) }
		t.equal(lengths, { a: 1, ab: 2, b: 0, x: 0 })
		t.equal(dstAB, [ 'x', 2, 'x' ])
		t.equal(dstA, [ 'x', 'x', 'x' ])
	}

	{
		const dstA = fill(3)
		const dstB = fill(3)
		const lengths = { ...__comm(dstA, 1, null, 0, dstB, 1, null, 0, [ 2, 3 ], 0, 2, [ 2, 2, 3 ], 0, 1, cmp) }
		t.equal(lengths, { a: 2, ab: 0, b: 1, x: 0 })
		t.equal(dstA, [ 'x', 3, 'x' ])
		t.equal(dstB, [ 'x', 'x', 'x' ])
	}

	{
		const dstA = fill(2)
		const dstAB = fill(2)
		const dstB = fill(2)
		const dstX = fill(2)
		const lengths = { ...__comm(dstA, 1, dstAB, 1, dstB, 1, dstX, 1, [ 1, 2 ], 1, 1, [ 1, 2 ], 2, 2, cmp) }
		t.equal(lengths, { a: 1, ab: 1, b: 1, x: 1 })
		t.equal(dstA, [ 'x', 'x' ])
		t.equal(dstAB, [ 'x', 'x' ])
		t.equal(dstB, [ 'x', 'x' ])
		t.equal(dstX, [ 'x', 'x' ])
	}

	{
		const dstA = fill(3)
		const dstX = fill(3)
		const lengths = { ...__comm(dstA, 1, null, 0, null, 0, dstX, 1, [ 0, 4, 0 ], 1, 2, [ 0 ], 1, 1, cmp) }
		t.equal(lengths, { a: 2, ab: 0, b: 0, x: 2 })
		t.equal(dstA, [ 'x', 4, 'x' ])
		t.equal(dstX, [ 'x', 4, 'x' ])
	}
})
