const { test } = require('@kmamal/testing')
const { kebabCase, isKebabCase } = require('./kebab')

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

test('string.kebabCase', (t) => {
	for (const [ input, expected ] of cases) {
		const result = kebabCase(input)
		t.ok(isKebabCase(result))
		t.equal(result, expected, { input })
	}
})
