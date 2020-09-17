const { test } = require('@xyz/testing')
const { reduce, reduceRight } = require('.')

test('array.reduce', (t) => {
	t.equal(reduce([], () => {}), undefined)
	t.equal(reduce([], () => {}, 'x'), 'x')
	t.equal(reduce([ 'a' ], () => {}), 'a')
	t.equal(reduce([ 'a' ], (a, x) => x, 'x'), 'a')
	t.equal(reduce([ 'a', 'b', 'c' ], (a, x) => x), 'c')
	t.equal(reduce([ 'a', 'b', 'c' ], (a, x) => a + x), 'abc')
	t.equal(reduce([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), 'xabc')
})

test('array.reduceRight', (t) => {
	t.equal(reduceRight([], () => {}), undefined)
	t.equal(reduceRight([], () => {}, 'x'), 'x')
	t.equal(reduceRight([ 'a' ], () => {}), 'a')
	t.equal(reduceRight([ 'a' ], (a, x) => x, 'x'), 'a')
	t.equal(reduceRight([ 'a', 'b', 'c' ], (a, x) => x), 'a')
	t.equal(reduceRight([ 'a', 'b', 'c' ], (a, x) => a + x), 'cba')
	t.equal(reduceRight([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), 'xcba')
})
