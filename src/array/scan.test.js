const { test } = require('@xyz/testing')
const { scan, scanRight } = require('.')

test('array.scan', (t) => {
	t.equal(scan([], () => {}), [])
	t.equal(scan([], () => {}, 'x'), [])
	t.equal(scan([ 'a' ], () => {}), [ 'a' ])
	t.equal(scan([ 'a' ], (a, x) => x), [ 'a' ])
	t.equal(scan([ 'a', 'b', 'c' ], (a, x) => x), [ 'a', 'b', 'c' ])
	t.equal(scan([ 'a', 'b', 'c' ], (a, x) => a + x), [ 'a', 'ab', 'abc' ])
	t.equal(scan([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), [ 'xa', 'xab', 'xabc' ])
})

test('array.scan.$$$', (t) => {
	t.equal(scan.$$$([], () => {}), [])
	t.equal(scan.$$$([], () => {}, 'x'), [])
	t.equal(scan.$$$([ 'a' ], () => {}), [ 'a' ])
	t.equal(scan.$$$([ 'a' ], (a, x) => x), [ 'a' ])
	t.equal(scan.$$$([ 'a', 'b', 'c' ], (a, x) => x), [ 'a', 'b', 'c' ])
	t.equal(scan.$$$([ 'a', 'b', 'c' ], (a, x) => a + x), [ 'a', 'ab', 'abc' ])
	t.equal(scan.$$$([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), [ 'xa', 'xab', 'xabc' ])
})

test('array.scanRight', (t) => {
	t.equal(scanRight([], () => {}), [])
	t.equal(scanRight([], () => {}, 'x'), [])
	t.equal(scanRight([ 'a' ], () => {}), [ 'a' ])
	t.equal(scanRight([ 'a' ], (a, x) => x), [ 'a' ])
	t.equal(scanRight([ 'a', 'b', 'c' ], (a, x) => x), [ 'a', 'b', 'c' ])
	t.equal(scanRight([ 'a', 'b', 'c' ], (a, x) => a + x), [ 'cba', 'cb', 'c' ])
	t.equal(scanRight([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), [ 'xcba', 'xcb', 'xc' ])
})

test('array.scanRight.$$$', (t) => {
	t.equal(scanRight.$$$([], () => {}), [])
	t.equal(scanRight.$$$([], () => {}, 'x'), [])
	t.equal(scanRight.$$$([ 'a' ], () => {}), [ 'a' ])
	t.equal(scanRight.$$$([ 'a' ], (a, x) => x), [ 'a' ])
	t.equal(scanRight.$$$([ 'a', 'b', 'c' ], (a, x) => x), [ 'a', 'b', 'c' ])
	t.equal(scanRight.$$$([ 'a', 'b', 'c' ], (a, x) => a + x), [ 'cba', 'cb', 'c' ])
	t.equal(scanRight.$$$([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), [ 'xcba', 'xcb', 'xc' ])
})
