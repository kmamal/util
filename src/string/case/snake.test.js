const { test } = require('@kmamal/testing')
const { snakeCase, isSnakeCase } = require('./snake')

const cases = [
	[ '_', '-' ],
	[ '-', '-' ],
	[ 'a', 'a' ],
	[ 'A', 'a' ],
	[ 'foo', 'foo' ],
	[ 'Foo', 'foo' ],
	[ 'fooBar', 'foo-bar' ],
	[ 'FooBar', 'foo-bar' ],
	[ 'foo-bar', 'foo-bar' ],
	[ 'foo_bar', 'foo-bar' ],
	[ '__foo_bar_', '--foo-bar-' ],
	[ '-foo-bar--', '-foo-bar--' ],
]

test('string.snakeCase', (t) => {
	for (const [ input, expected ] of cases) {
		const result = snakeCase(input)
		t.ok(isSnakeCase(result))
		t.equal(result, expected, { input })
	}
})
