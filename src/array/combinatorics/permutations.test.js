const { test } = require('@kmamal/testing')
const { testVariants } = require('../../testing/test-variants')
const { permutations } = require('./permutations')

const collect = (iterator) => Array.from(iterator, (x) => Array.from(x))

const testPermutations = (t, f) => {
	t.equal(collect(f([])), [ [] ])
	t.equal(collect(f([ 1 ])), [ [ 1 ] ])
	t.equal(collect(f([ 1, 2 ])), [ [ 1, 2 ], [ 2, 1 ] ])
	t.equal(collect(f([ 1, 2, 3 ])), [
		[ 1, 2, 3 ],
		[ 2, 1, 3 ],
		[ 3, 1, 2 ],
		[ 1, 3, 2 ],
		[ 2, 3, 1 ],
		[ 3, 2, 1 ],
	])
}

testVariants("array.permutations", permutations, testPermutations, { to: null, $$$: null })

test("array.permutations.$$$", (t) => testPermutations(t, permutations.$$$))
