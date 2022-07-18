const { test } = require('@kmamal/testing')
const { snakeCase, isSnakeCase } = require('./snake')

const cases = [
	[ '_', '_' ],
	[ '-', '_' ],
	[ 'a', 'a' ],
	[ 'A', 'a' ],
	[ 'foo', 'foo' ],
	[ 'Foo', 'foo' ],
	[ 'fooBar', 'foo_bar' ],
	[ 'FooBar', 'foo_bar' ],
	[ 'foo-bar', 'foo_bar' ],
	[ 'foo_bar', 'foo_bar' ],
	[ '__foo_bar_', '__foo_bar_' ],
	[ '-foo-bar--', '_foo_bar__' ],
]

test('string.snakeCase', (t) => {
	for (const [ input, expected ] of cases) {
		const result = snakeCase(input)
		t.ok(isSnakeCase(result))
		t.equal(result, expected, { input })
	}
})
