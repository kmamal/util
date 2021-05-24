const { test } = require('@kmamal/testing')
const Ops = require('.')

const pairs = [
	[ -42, 69 ],
	[ 0, 0 ],
	[ 0, 1 ],
	[ 1, 0 ],
	[ 1, 1 ],
]

test("operators", (t) => {
	for (const [ a, b ] of pairs) {
		t.equal(Ops.add(a, b), a + b)
		t.equal(Ops.div(a, b), a / b)
		t.equal(Ops.neg(a), -a)
		t.equal(Ops.mod(a, b), a % b)
		t.equal(Ops.mul(a, b), a * b)
		t.equal(Ops.pow(a, b), a ** b)
		t.equal(Ops.sub(a, b), a - b)

		t.equal(Ops.bitAnd(a, b), a & b)
		t.equal(Ops.bitNot(a, b), ~a)
		t.equal(Ops.bitOr(a, b), a | b)
		t.equal(Ops.bitXor(a, b), a ^ b)
		t.equal(Ops.shiftL(a, b), a << b)
		t.equal(Ops.shiftR(a, b), a >> b)
		t.equal(Ops.shiftZ(a, b), a >>> b)

		t.equal(Ops.eq(a, b), a === b)
		t.equal(Ops.gt(a, b), a > b)
		t.equal(Ops.gte(a, b), a >= b)
		t.equal(Ops.lt(a, b), a < b)
		t.equal(Ops.lte(a, b), a <= b)
		t.equal(Ops.neq(a, b), a !== b)

		t.equal(Ops.and(a, b), a && b)
		t.equal(Ops.nil(a, b), a ?? b)
		t.equal(Ops.not(a, b), !a)
		t.equal(Ops.or(a, b), a || b)
	}
})
