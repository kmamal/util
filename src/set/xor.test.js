const { test } = require('@kmamal/testing')
const { xor } = require('./xor')

test("set.xor", (t) => {
	const a = new Set([ 1, 2, 3 ])
	const b = new Set([ 2, 3, 4 ])
	const set = xor(a, b)

	t.assert(() => set.size <= a.size)

	// The xor contains only values of a or b, but not of both
	for (const x of set) {
		if (!a.has(x) && !b.has(x)) {
			t.fail({ reason: "extra value", x, a, b })
		}

		if (b.has(x) && a.has(x)) {
			t.fail({ reason: "value not removed", x, b, a })
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

	// All values of b appear if they are not in a
	for (const x of b) {
		if (!set.has(x)) {
			if (!a.has(x)) {
				t.fail({ reason: "value missing", x, b })
			}
		}
	}
})
