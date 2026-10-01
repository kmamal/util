const { test } = require('@kmamal/testing')
const { __splitWords } = require('./split-words')

const cases = [
	[ '', 0, [], 0 ],
	[ '_', 1, [], 0 ],
	[ '-_-', 3, [], 0 ],
	[ 'a', 0, [ 'a' ], 0 ],
	[ 'foo', 0, [ 'foo' ], 0 ],
	[ '__foo', 2, [ 'foo' ], 0 ],
	[ 'foo--', 0, [ 'foo' ], 2 ],
	[ '-_foo_bar_-', 2, [ 'foo', 'bar' ], 2 ],
	[ 'foo-bar_baz', 0, [ 'foo', 'bar', 'baz' ], 0 ],
	[ 'foo--__bar', 0, [ 'foo', 'bar' ], 0 ],
	[ 'fooBar', 0, [ 'foo', 'Bar' ], 0 ],
	[ 'FooBar', 0, [ 'Foo', 'Bar' ], 0 ],
	[ 'FOO', 0, [ 'FOO' ], 0 ],
	[ 'FOO_BAR', 0, [ 'FOO', 'BAR' ], 0 ],
	[ 'XMLHttpRequest', 0, [ 'XML', 'Http', 'Request' ], 0 ],
	[ 'getHTTP', 0, [ 'get', 'HTTP' ], 0 ],
	[ 'ABc', 0, [ 'A', 'Bc' ], 0 ],
	[ 'abc123', 0, [ 'abc123' ], 0 ],
	[ '123abc', 0, [ '123abc' ], 0 ],
	[ 'abc123Def', 0, [ 'abc123', 'Def' ], 0 ],
	[ 'ABC123', 0, [ 'ABC123' ], 0 ],
	[ 'a1B2', 0, [ 'a1', 'B2' ], 0 ],
	[ '_-Foo-Bar', 2, [ 'Foo', 'Bar' ], 0 ],
	[ '-B', 1, [ 'B' ], 0 ],
	[ 'a-B', 0, [ 'a', 'B' ], 0 ],
	[ 'foo bar', 0, [ 'foo bar' ], 0 ],
	[ 'foo.Bar', 0, [ 'foo.Bar' ], 0 ],
	[ 'fooÉtat', 0, [ 'foo', 'État' ], 0 ],
	[ '_𐐨𐐀x_', 1, [ '𐐨', '𐐀x' ], 1 ],
]

test("string.case.__splitWords", (t) => {
	for (const [ str, leading, words, trailing ] of cases) {
		t.equal(__splitWords(str), { leading, words, trailing })
	}
})
