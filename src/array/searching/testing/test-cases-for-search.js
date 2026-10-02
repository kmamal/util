const { test } = require('@kmamal/testing')

const uniqueCases = [
	[ [], 0, 0, 0 ],
	[ [ 1 ], 0, 0, 0 ],
	[ [ 1 ], 1, 0, 1 ],
	[ [ 1 ], 2, 1, 1 ],
	[ [ 1, 2, 3 ], 0, 0, 0 ],
	[ [ 1, 2, 3 ], 1, 0, 1 ],
	[ [ 1, 2, 3 ], 2, 1, 2 ],
	[ [ 1, 2, 3 ], 3, 2, 3 ],
	[ [ 1, 2, 3 ], 4, 3, 3 ],
	[ [ -1e16, 0, 1 ], 0.5, 2, 2 ],
	[ [ -3.7e31, -3.7e26, -4.1e17, -2.7e14, -7e11, -5.4e10, -3.5e9, 2.8e9, 9.1e13, 1.1e15, 1.7e31 ], 1.1e15, 9, 10 ],
]

const duplicateCases = [
	[ [ 2, 2, 2 ], 2, 0, 3 ],
	[ [ 1, 2, 2, 2, 3 ], 2, 1, 4 ],
	[ [ 1, 1, 2, 3, 3 ], 1, 0, 2 ],
	[ [ 1, 1, 2, 3, 3 ], 3, 3, 5 ],
]

const allCases = [ ...uniqueCases, ...duplicateCases ]

const kinds = {
	left: { cases: uniqueCases, column: 2 },
	right: { cases: uniqueCases, column: 3 },
	first: { cases: allCases, column: 2 },
	last: { cases: allCases, column: 3 },
}

const double = (x) => 2 * x
const reversed = (a, b) => b - a

const createTests = (name, fnSearch, kind) => {
	const { cases, column } = kinds[kind]

	test(name, (t) => {
		for (const testCase of cases) {
			t.equal(fnSearch(testCase[0], testCase[1]), testCase[column])
		}
	})
}

const createByTests = (name, fnSearch, kind) => {
	const { cases, column } = kinds[kind]

	test(name, (t) => {
		for (const testCase of cases) {
			t.equal(fnSearch(testCase[0], testCase[1], double), testCase[column])
		}
	})
}

const createWithTests = (name, fnSearch, kind) => {
	const { cases, column } = kinds[kind]
	const mirroredColumn = 5 - column

	test(name, (t) => {
		for (const testCase of cases) {
			const arr = testCase[0].toReversed()
			const expected = arr.length - testCase[mirroredColumn]
			t.equal(fnSearch(arr, testCase[1], reversed), expected)
		}
	})
}

module.exports = {
	createTests,
	createByTests,
	createWithTests,
}
