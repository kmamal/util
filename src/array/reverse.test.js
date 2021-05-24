const { test } = require('@kmamal/testing')
const { reverse } = require('./reverse')

test("array.reverse", (t) => {
	t.equal(reverse([]), [])
	t.equal(reverse([ 1 ]), [ 1 ])
	t.equal(reverse([ 1, 1 ]), [ 1, 1 ])
	t.equal(reverse([ 1, 2, 3 ]), [ 3, 2, 1 ])
})

test("array.reverse.$$$", (t) => {
	t.equal(reverse([]), [])
	t.equal(reverse([ 1 ]), [ 1 ])
	t.equal(reverse([ 1, 1 ]), [ 1, 1 ])
	t.equal(reverse([ 1, 2, 3 ]), [ 3, 2, 1 ])
})
