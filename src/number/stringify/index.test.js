const { test } = require('@xyz/testing')
const Stringify = {
	...require('./to-exponential'),
	...require('./to-fixed'),
	...require('./to-locale-string'),
	...require('./to-precision'),
}

const a = [ 42, -69, Math.PI, Number.MAX_VALUE, Infinity, NaN ]

test("number.stringify", (t) => {
	for (const x of a) {
		t.equal(Stringify.toExponential(x, 5), x.toExponential(5))
		t.equal(Stringify.toFixed(x, 5), x.toFixed(5))
		t.equal(Stringify.toLocaleString(x, 'ar-EG'), x.toLocaleString('ar-EG'))
		t.equal(Stringify.toPrecision(x, 5), x.toPrecision(5))
	}
})
