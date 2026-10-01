const { test } = require('@kmamal/testing')
const double = require('./double')

test("ieee-float.double.sign", (t) => {
	t.equal(double.sign(1), 0)
	t.equal(double.sign(-1), 1)
	t.equal(double.parse(-2).sign, 1)
	t.equal(double.from(double.parse(-2)), -2)
})

test("ieee-float.double.nextToward", (t) => {
	t.equal(double.nextToward(1, 2), 1 + Number.EPSILON)
	t.equal(double.nextToward(0, 1), Number.MIN_VALUE)
	t.equal(double.nextToward(0, -1), -Number.MIN_VALUE)
	t.equal(double.nextToward(Infinity, Infinity), Infinity)
	t.equal(double.nextToward(-Infinity, -Infinity), -Infinity)
	t.equal(double.nextToward(Infinity, 0), Number.MAX_VALUE)
	t.equal(double.nextToward(-Infinity, 0), -Number.MAX_VALUE)
	t.ok(Number.isNaN(double.nextToward(NaN, 1)))
})
