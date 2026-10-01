const { test } = require('@kmamal/testing')
const { __reduce, __reduceRight, reduce, reduceRight } = require('./reduce')

test("array.reduce", (t) => {
	t.equal(reduce([], () => {}), undefined)
	t.equal(reduce([], () => {}, 'x'), 'x')
	t.equal(reduce([ 'a' ], () => {}), 'a')
	t.equal(reduce([ 'a' ], (a, x) => x, 'x'), 'a')
	t.equal(reduce([ 'a', 'b', 'c' ], (a, x) => x), 'c')
	t.equal(reduce([ 'a', 'b', 'c' ], (a, x) => a + x), 'abc')
	t.equal(reduce([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), 'xabc')
})

test("array.reduceRight", (t) => {
	t.equal(reduceRight([], () => {}), undefined)
	t.equal(reduceRight([], () => {}, 'x'), 'x')
	t.equal(reduceRight([ 'a' ], () => {}), 'a')
	t.equal(reduceRight([ 'a' ], (a, x) => x, 'x'), 'a')
	t.equal(reduceRight([ 'a', 'b', 'c' ], (a, x) => x), 'a')
	t.equal(reduceRight([ 'a', 'b', 'c' ], (a, x) => a + x), 'cba')
	t.equal(reduceRight([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), 'xcba')
})

test("array.__reduce", (t) => {
	const concat = (a, x) => a + x
	const arr = [ 'x', 'a', 'b', 'c', 'x' ]
	t.equal(__reduce(arr, 1, 4, concat), 'abc')
	t.equal(__reduce(arr, 1, 4, concat), reduce(arr.slice(1, 4), concat))
	t.equal(__reduce(arr, 1, 4, concat, 'i'), 'iabc')
	t.equal(__reduce(arr, 2, 3, concat), 'b')
	t.equal(__reduce(arr, 2, 3, concat, 'i'), 'ib')
	t.equal(__reduce(arr, 2, 2, concat), undefined)
	t.equal(__reduce(arr, 2, 2, concat, 'i'), 'i')
	t.equal(arr, [ 'x', 'a', 'b', 'c', 'x' ])
})

test("array.__reduceRight", (t) => {
	const concat = (a, x) => a + x
	const arr = [ 'x', 'a', 'b', 'c', 'x' ]
	t.equal(__reduceRight(arr, 1, 4, concat), 'cba')
	t.equal(__reduceRight(arr, 1, 4, concat), reduceRight(arr.slice(1, 4), concat))
	t.equal(__reduceRight(arr, 1, 4, concat, 'i'), 'icba')
	t.equal(__reduceRight(arr, 2, 3, concat), 'b')
	t.equal(__reduceRight(arr, 2, 3, concat, 'i'), 'ib')
	t.equal(__reduceRight(arr, 2, 2, concat), undefined)
	t.equal(__reduceRight(arr, 2, 2, concat, 'i'), 'i')
	t.equal(arr, [ 'x', 'a', 'b', 'c', 'x' ])
})
