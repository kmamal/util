const { permutations } = require('../../combinatorics/permutations')
const { isEqual } = require('../../../object/is-equal')

const { radixsortBy } = require('../radixsort')
const { identity } = require('../../../function/identity')

let length = 0
for (;;) {
	const A = Array.from({ length }, (x, i) => i)

	for (const B of permutations(A)) {
		const C = Array.from(B)
		try {
			radixsortBy.$$$(C, identity)
		} catch (error) {
			console.log({ in: B, error })
			process.exit(1)
		}
		if (!isEqual(A, C)) {
			console.log({ in: B, out: C })
			process.exit(1)
		}
	}

	console.log(`Size ${length} ok`)
	length += 1
}
