const { test } = require('@kmamal/testing')
const { upperFirst, isUpperFirst } = require('./upper-first')

test('string.upperFirst', (t) => {
	t.equal(upperFirst(''), '')
	t.equal(upperFirst('a'), 'A')
	t.equal(upperFirst('foo bar'), 'Foo bar')
	t.equal(upperFirst('𐐨x'), '𐐀x')
	t.ok(isUpperFirst(''))
	t.ok(isUpperFirst('Foo'))
	t.ok(!isUpperFirst('foo'))
})
