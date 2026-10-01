const { test } = require('@kmamal/testing')
const { nonReentrant, SYM: { kNonReentrant } } = require('./non-reentrant')

test("function.async.nonReentrant", async (t) => {
	let resolve
	const wrapped = nonReentrant(() => new Promise((r) => { resolve = r }))
	const first = wrapped()
	t.equal(await wrapped(), kNonReentrant)
	resolve(1)
	t.equal(await first, 1)
})

test("function.async.nonReentrant Unlocks after throw", async (t) => {
	let calls = 0
	const wrapped = nonReentrant(() => {
		calls += 1
		if (calls === 1) { return Promise.reject(new Error('boom')) }
		return Promise.resolve('ok')
	})
	await t.throwsAsync(() => wrapped())
	t.equal(await wrapped(), 'ok')
})
