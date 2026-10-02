const { test } = require('@kmamal/testing')
const { allValues } = require('./all-values')

test("promise.allValues", async (t) => {
	t.equal(await allValues({}), {})
	t.equal(await allValues({ a: 1, b: Promise.resolve(2) }), { a: 1, b: 2 })

	const s = Symbol('s')
	const res = await allValues({ a: 1, [s]: Promise.resolve(2) })
	t.equal(Reflect.ownKeys(res), [ 'a', s ])
	t.equal(res[s], 2)

	let error
	try { await allValues({ a: Promise.reject(new Error("x")) }) }
	catch (err) { error = err }
	t.equal(error.message, "x")
})
