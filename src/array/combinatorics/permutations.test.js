const { test } = require('@kmamal/testing')
const { permutations } = require('./permutations')
const { clone } = require('../clone')

test("array.permutations", (t) => {
	t.equal([ ...permutations([]) ], [ [] ])
	t.equal([ ...permutations([ 1 ]) ], [ [ 1 ] ])
	t.equal([ ...permutations([ 1, 2 ]) ], [ [ 1, 2 ], [ 2, 1 ] ])
	t.equal([ ...permutations([ 1, 2, 3 ]) ], [
		[ 1, 2, 3 ],
		[ 2, 1, 3 ],
		[ 3, 1, 2 ],
		[ 1, 3, 2 ],
		[ 2, 3, 1 ],
		[ 3, 2, 1 ],
	])
})

test("array.permutations.$$$", (t) => {
	const getResult = (iterator) => {
		const result = []
		for (const x of iterator) {
			result.push(clone(x))
		}
		return result
	}

	t.equal(getResult(permutations.$$$([])), [ [] ])
	t.equal(getResult(permutations.$$$([ 1 ])), [ [ 1 ] ])
	t.equal(getResult(permutations.$$$([ 1, 2 ])), [ [ 1, 2 ], [ 2, 1 ] ])
	t.equal(getResult(permutations.$$$([ 1, 2, 3 ])), [
		[ 1, 2, 3 ],
		[ 2, 1, 3 ],
		[ 3, 1, 2 ],
		[ 1, 3, 2 ],
		[ 2, 3, 1 ],
		[ 3, 2, 1 ],
	])
})
