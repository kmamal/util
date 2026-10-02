const { test } = require('@kmamal/testing')
const { floorTo, ceilTo, roundTo, roundUp, roundDown } = require('./rounding')

test("number.floorTo", (t) => {
	t.equal(floorTo(7, 5), 5)
	t.equal(floorTo(10, 5), 10)
	t.equal(floorTo(1.5, 1), 1)
	t.equal(floorTo(-1.5, 1), -2)
	t.equal(floorTo(-7, 5), -10)
	t.equal(floorTo(-10, 5), -10)
	t.equal(floorTo(7, -5), 5)
	t.equal(floorTo(0.75, 0.5), 0.5)
})

test("number.ceilTo", (t) => {
	t.equal(ceilTo(7, 5), 10)
	t.equal(ceilTo(10, 5), 10)
	t.equal(ceilTo(1.5, 1), 2)
	t.equal(ceilTo(-1.5, 1), -1)
	t.equal(ceilTo(-7, 5), -5)
	t.equal(ceilTo(-10, 5), -10)
	t.equal(ceilTo(7, -5), 10)
	t.equal(ceilTo(0.75, 0.5), 1)
})

test("number.roundTo", (t) => {
	t.equal(roundTo(7, 5), 5)
	t.equal(roundTo(8, 5), 10)
	t.equal(roundTo(2.5, 1), 3)
	t.equal(roundTo(-2.5, 1), -3)
	t.equal(roundTo(-8, 5), -10)
})

test("number.roundUp", (t) => {
	t.equal(roundUp(1.2), 2)
	t.equal(roundUp(-1.2), -2)
	t.equal(roundUp(3), 3)
})

test("number.roundDown", (t) => {
	t.equal(roundDown(1.8), 1)
	t.equal(roundDown(-1.8), -1)
	t.equal(roundDown(3), 3)
})
