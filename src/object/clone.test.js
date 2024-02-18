const { test } = require('@kmamal/testing')
const { clone } = require('./clone')

test("object.clone", (t) => {
	t.equal(undefined, clone(undefined))
	t.equal(null, clone(null))
	t.equal(false, clone(false))
	t.equal(0, clone(0))
	t.equal(-1, clone(-1))
	t.equal(NaN, clone(NaN))
	t.equal(Infinity, clone(Infinity))
	t.equal("foo", clone("foo"))
	t.equal(Symbol.for('foo'), clone(Symbol.for('foo')))
	t.equal([], clone([]))
	t.equal([ 1, 2, 3 ], clone([ 1, 2, 3 ]))
	t.equal({ a: 1, b: 2 }, clone({ a: 1, b: 2 }))
	t.equal(new Set(), clone(new Set()))
	t.equal(new Set([ 1, 2, 3 ]), clone(new Set([ 1, 2, 3 ])))
	t.equal(new Map(), clone(new Map()))
	t.equal(new Map([ [ 1, 2 ] ]), clone(new Map([ [ 1, 2 ] ])))

	const obj = {
		a: 5,
		b: "Hello, World!",
		c: [
			new Map([
				[ { foo: 42 }, 6 ],
				[ "bar", { baz: "baz" } ],
				[ false, null ],
			]),
			new Set([ 1, 2, 3, 4, 5 ]),
		],
	}
	t.equal(obj, clone(obj))
})
