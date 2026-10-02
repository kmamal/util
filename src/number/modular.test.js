const { test } = require('@kmamal/testing')
const { add, sub, inc, dec } = require('./modular')

test("number.modular.add", (t) => {
	t.equal(add(1, 1, 3), 2)
	t.equal(add(2, 1, 3), 0)
	t.equal(add(2, 5, 3), 1)
})

test("number.modular.sub", (t) => {
	t.equal(sub(2, 1, 3), 1)
	t.equal(sub(0, 1, 3), 2)
	t.equal(sub(1, 5, 3), 2)
})

test("number.modular.inc", (t) => {
	t.equal(inc(0, 3), 1)
	t.equal(inc(1, 3), 2)
	t.equal(inc(2, 3), 0)
	t.equal(inc(5, 3), 0)
})

test("number.modular.dec", (t) => {
	t.equal(dec(2, 3), 1)
	t.equal(dec(1, 3), 0)
	t.equal(dec(0, 3), 2)
})
