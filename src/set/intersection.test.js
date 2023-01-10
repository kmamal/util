const { test } = require('@kmamal/testing')
const { intersection } = require('./intersection')

test("set.intersection", (t) => {
	const a = new Set([ 1, 2, 3 ])
	const b = new Set([ 2, 3, 4 ])
	const set = intersection(a, b)

	t.ok(set.size <= a.size)

	// The intercetion contains only values that are both in a and b
	for (const x of set) {
		if (!a.has(x)) {
			t.fail({ reason: "value not removed", set, x, a, b })
		}

		if (!b.has(x)) {
			t.fail({ reason: "value not removed", set, x, a, b })
		}
	}

	// All values of a appear if they are also in b
	for (const x of a) {
		if (set.has(x)) {
			if (!b.has(x)) {
				t.fail({ reason: "value not removed", set, x, a, b })
			}
		} else if (b.has(x)) {
			t.fail({ reason: "value missing", set, x, a, b })
		}
	}

	// All values of b appear if they are also in a
	for (const x of b) {
		if (set.has(x)) {
			if (!a.has(x)) {
				t.fail({ reason: "value not removed", set, x, a, b })
			}
		} else if (a.has(x)) {
			t.fail({ reason: "value missing", set, x, a, b })
		}
	}
})
