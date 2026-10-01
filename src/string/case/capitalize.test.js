const { test } = require('@kmamal/testing')
const { capitalize, isCapitalized } = require('./capitalize')

test('string.capitalize', (t) => {
	t.equal(capitalize(''), '')
	t.equal(capitalize('foo bar'), 'Foo Bar')
	t.equal(capitalize('a  b'), 'A  B')
	t.ok(isCapitalized('Foo Bar'))
	t.ok(!isCapitalized('foo Bar'))
})
