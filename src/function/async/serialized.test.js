const { test } = require('@kmamal/testing')
const { serialized } = require('./serialized')

test("function.async.serialized", async (t) => {
	const order = []
	const wrapped = serialized(async (x, time) => {
		await new Promise((r) => { setTimeout(r, time) })
		order.push(x)
		return x
	})
	const results = await Promise.all([ wrapped(1, 30), wrapped(2, 0) ])
	t.equal(results, [ 1, 2 ])
	t.equal(order, [ 1, 2 ])
})

test("function.async.serialized Recovers after rejection", async (t) => {
	const wrapped = serialized((x) => {
		if (x === 1) { return Promise.reject(new Error('boom')) }
		return Promise.resolve(x)
	})
	const first = wrapped(1)
	const second = wrapped(2)
	await t.throwsAsync(() => first)
	t.equal(await second, 2)
	t.equal(await wrapped(3), 3)
})
