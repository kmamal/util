const { test } = require('@xyz/testing')
const { camelCase, isCamelCase } = require('./camel')

const cases = [
	[ '_', '_' ],
	[ '-', '_' ],
	[ 'a', 'a' ],
	[ 'A', 'a' ],
	[ 'foo', 'foo' ],
	[ 'Foo', 'foo' ],
	[ 'fooBar', 'fooBar' ],
	[ 'FooBar', 'fooBar' ],
	[ 'foo-bar', 'fooBar' ],
	[ 'foo_bar', 'fooBar' ],
	[ '__foo_bar_', '__fooBar_' ],
	[ '-foo-bar--', '_fooBar__' ],
]

test('string.camelCase', (t) => {
	for (const [ input, expected ] of cases) {
		const result = camelCase(input)
		t.ok(isCamelCase(result))
		t.equal(result, expected, { input })
	}
})
