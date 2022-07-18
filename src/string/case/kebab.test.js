const { test } = require('@kmamal/testing')
const { kebabCase, isKebabCase } = require('./kebab')

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

test('string.kebabCase', (t) => {
	for (const [ input, expected ] of cases) {
		const result = kebabCase(input)
		t.ok(isKebabCase(result))
		t.equal(result, expected, { input })
	}
})
