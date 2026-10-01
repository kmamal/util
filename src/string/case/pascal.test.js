const { test } = require('@kmamal/testing')
const { pascalCase, isPascalCase } = require('./pascal')

const cases = [
	[ '_', '_' ],
	[ '-', '_' ],
	[ 'a', 'A' ],
	[ 'A', 'A' ],
	[ 'foo', 'Foo' ],
	[ 'Foo', 'Foo' ],
	[ 'fooBar', 'FooBar' ],
	[ 'FooBar', 'FooBar' ],
	[ 'foo-bar', 'FooBar' ],
	[ 'foo_bar', 'FooBar' ],
	[ '__foo_bar_', '__FooBar_' ],
	[ '-foo-bar--', '_FooBar__' ],
	[ 'abc123', 'Abc123' ],
	[ 'XMLHttpRequest', 'XmlHttpRequest' ],
	[ 'FOO_BAR', 'FooBar' ],
	[ '𐐨x', '𐐀x' ],
	[ 'foo-𐐨x', 'Foo𐐀x' ],
	[ '', '' ],
]

test('string.pascalCase', (t) => {
	for (const [ input, expected ] of cases) {
		const result = pascalCase(input)
		t.ok(isPascalCase(result))
		t.equal(result, expected)
	}
})
