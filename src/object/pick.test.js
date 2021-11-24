const { test } = require('@kmamal/testing')
const { pick, omit } = require('./pick')

test('object.pick', (t) => {
	t.equal(pick({}, []), {})
	t.equal(pick({}, [ 'a', 'b' ]), {})
	t.equal(pick({ a: 1 }, [ 'a' ]), { a: 1 })
	t.equal(pick({ a: 1 }, [ 'b' ]), {})
	t.equal(pick({ a: 1, b: 2 }, [ 'a' ]), { a: 1 })
	t.equal(pick({ a: 1, b: 2 }, [ 'b' ]), { b: 2 })
	t.equal(pick({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), { a: 1, b: 2 })
})

test('object.pick.$$$', (t) => {
	t.equal(pick.$$$({}, []), {})
	t.equal(pick.$$$({}, [ 'a', 'b' ]), {})
	t.equal(pick.$$$({ a: 1 }, [ 'a' ]), { a: 1 })
	t.equal(pick.$$$({ a: 1 }, [ 'b' ]), {})
	t.equal(pick.$$$({ a: 1, b: 2 }, [ 'a' ]), { a: 1 })
	t.equal(pick.$$$({ a: 1, b: 2 }, [ 'b' ]), { b: 2 })
	t.equal(pick.$$$({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), { a: 1, b: 2 })
})

test('object.omit', (t) => {
	t.equal(omit({}, []), {})
	t.equal(omit({}, [ 'a', 'b' ]), {})
	t.equal(omit({ a: 1 }, [ 'a' ]), {})
	t.equal(omit({ a: 1 }, [ 'b' ]), { a: 1 })
	t.equal(omit({ a: 1, b: 2 }, []), { a: 1, b: 2 })
	t.equal(omit({ a: 1, b: 2 }, [ 'a' ]), { b: 2 })
	t.equal(omit({ a: 1, b: 2 }, [ 'b' ]), { a: 1 })
	t.equal(omit({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), {})
})

test('object.omit.$$$', (t) => {
	t.equal(omit.$$$({}, []), {})
	t.equal(omit.$$$({}, [ 'a', 'b' ]), {})
	t.equal(omit.$$$({ a: 1 }, [ 'a' ]), {})
	t.equal(omit.$$$({ a: 1 }, [ 'b' ]), { a: 1 })
	t.equal(omit.$$$({ a: 1, b: 2 }, []), { a: 1, b: 2 })
	t.equal(omit.$$$({ a: 1, b: 2 }, [ 'a' ]), { b: 2 })
	t.equal(omit.$$$({ a: 1, b: 2 }, [ 'b' ]), { a: 1 })
	t.equal(omit.$$$({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), {})
})
