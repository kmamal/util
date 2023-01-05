const { test } = require('@kmamal/testing')
const {
	selectIndex,
	select,
} = require('./select')
const { fillWith } = require('./fill')
const { identity } = require('../function/identity')
const { shuffle } = require('../random/shuffle')

const nums = fillWith.$$$(new Array(10), identity)

test("array.selectIndex", (t) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const index = selectIndex(arr, i)
		t.equal(arr[index], i, { arr, index })
	}
})

test("array.selectIndex.$$$", (t) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const index = selectIndex.$$$(arr, i)
		t.equal(arr[index], i, { arr, index })
	}
})

test("array.select", (t) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const item = select(arr, i)
		t.equal(item, i, { arr })
	}
})

test("array.select.$$$", (t) => {
	for (let i = 0; i < nums.length; i++) {
		const arr = shuffle(nums)
		const item = select.$$$(arr, i)
		t.equal(item, i, { arr })
	}
})
