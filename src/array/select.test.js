const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const {
	__select,
	selectIndexWith,
	selectIndexBy,
	selectIndex,
	selectWith,
	selectBy,
	select,
} = require('./select')
const { create } = require('./create')
const { identity } = require('../function/identity')
const { shuffle } = require('../random/shuffle')
const { compare } = require('../function/compare')
const { MiddleSquareWeyl } = require('../random/seeded/middle-square-weyl')


const nums = create(10, identity)
const options = { to: null, $$$: null }

const testSelectIndex = (t, f) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const index = f(arr, i)
		t.equal(arr[index], i, { arr, index })
	}
}

testVariants("array.selectIndex", selectIndex, testSelectIndex, options)
test("array.selectIndex.$$$", (t) => testSelectIndex(t, selectIndex.$$$))

const testSelectIndexBy = (t, f) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const index = f(arr, i, (x) => -x)
		t.equal(arr[index], nums.length - 1 - i, { arr, index })
	}
}

testVariants("array.selectIndexBy", selectIndexBy, testSelectIndexBy, options)
test("array.selectIndexBy.$$$", (t) => testSelectIndexBy(t, selectIndexBy.$$$))

const testSelectIndexWith = (t, f) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const index = f(arr, i, (a, b) => b - a)
		t.equal(arr[index], nums.length - 1 - i, { arr, index })
	}
}

testVariants("array.selectIndexWith", selectIndexWith, testSelectIndexWith, options)
test("array.selectIndexWith.$$$", (t) => testSelectIndexWith(t, selectIndexWith.$$$))

const testSelect = (t, f) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const item = f(arr, i)
		t.equal(item, i, { arr })
	}
}

testVariants("array.select", select, testSelect, options)
test("array.select.$$$", (t) => testSelect(t, select.$$$))

const testSelectBy = (t, f) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const item = f(arr, i, (x) => -x)
		t.equal(item, nums.length - 1 - i, { arr })
	}
}

testVariants("array.selectBy", selectBy, testSelectBy, options)
test("array.selectBy.$$$", (t) => testSelectBy(t, selectBy.$$$))

const testSelectWith = (t, f) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const item = f(arr, i, (a, b) => b - a)
		t.equal(item, nums.length - 1 - i, { arr })
	}
}

testVariants("array.selectWith", selectWith, testSelectWith, options)
test("array.selectWith.$$$", (t) => testSelectWith(t, selectWith.$$$))

test("array.__select", (t) => {
	const rng = new MiddleSquareWeyl(42)
	const byValue = (a, b) => a - b
	const lo = -1000
	const hi = 1000

	for (let iter = 0; iter < 200; iter++) {
		const length = 1 + (rng.next() % 40)
		const numDistinct = 1 + (rng.next() % 12)
		const range = Array.from({ length }, () => rng.next() % numDistinct)
		const sorted = Array.from(range).sort(byValue)
		const padding = [ hi, lo, hi ]
		const start = padding.length

		for (let k = 0; k < length; k++) {
			const arr = [ ...padding, ...range, lo, hi ]
			const end = start + length
			const index = __select(arr, start, end, k, compare)
			const info = { range, k, index, arr }

			t.ok(start <= index && index < end, info)
			t.equal(arr[index], sorted[k], info)
			t.equal(arr[start + k], sorted[k], info)
			t.ok(arr.slice(start, index).every((x) => x <= arr[index]), info)
			t.ok(arr.slice(index + 1, end).every((x) => x >= arr[index]), info)
			t.equal(arr.slice(0, start), padding, info)
			t.equal(arr.slice(end), [ lo, hi ], info)
			t.equal(arr.slice(start, end).sort(byValue), sorted, info)
		}
	}

	const single = [ hi, 7, lo ]
	t.equal(__select(single, 1, 2, 0, compare), 1)
	t.equal(single, [ hi, 7, lo ])

	const reversed = [ lo, 5, 4, 3, 2, 1, 0, hi ]
	const index = __select(reversed, 1, 7, 2, (a, b) => b - a)
	t.equal(reversed[index], 3)
})
