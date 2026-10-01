const { testVariants, junkSet } = require('../testing/test-variants')
const { union } = require('./union')

testVariants("set.union", union, (t, f) => {
	const a = new Set([ 1, 2, 3 ])
	const b = new Set([ 2, 3, 4 ])
	const set = f(new Set(a), new Set(b))

	t.ok(set.size >= a.size)

	// The union contains only values from a and b
	for (const x of set) {
		if (!a.has(x) && !b.has(x)) {
			t.fail({ reason: "extra value", x, a, b })
		}
	}

	// All values of a appear
	for (const x of a) {
		if (!set.has(x)) {
			t.fail({ reason: "missing value", x, a })
		}
	}

	// All values of b appear
	for (const x of b) {
		if (!set.has(x)) {
			t.fail({ reason: "missing value", x, b })
		}
	}
}, { dst: junkSet })
