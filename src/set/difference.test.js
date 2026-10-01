const { testVariants, junkSet } = require('../testing/test-variants')
const { difference } = require('./difference')

testVariants("set.difference", difference, (t, f) => {
	const a = new Set([ 1, 2, 3 ])
	const b = new Set([ 2, 3, 4 ])
	const set = f(new Set(a), new Set(b))

	t.ok(set.size <= a.size)

	// The difference contains only values of a that are not in b
	for (const x of set) {
		if (!a.has(x)) {
			t.fail({ reason: "extra value", x, a })
		}

		if (b.has(x)) {
			t.fail({ reason: "value not removed", x, b })
		}
	}

	// All values of a appear if they are not in b
	for (const x of a) {
		if (!set.has(x)) {
			if (!b.has(x)) {
				t.fail({ reason: "value missing", x, a })
			}
		}
	}

	// No values of b appear
	for (const x of b) {
		if (set.has(x)) {
			t.fail({ reason: "value not removed", x, b })
		}
	}
}, { dst: junkSet })
