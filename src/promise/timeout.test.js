const { test } = require('@kmamal/testing')
const { timeout } = require('./timeout')

const rejection = async (promise) => {
	try { await promise }
	catch (error) { return error }
	return null
}

test("promise.timeout", async (t) => {
	const error = await rejection(timeout(1))
	t.ok(error instanceof Error)
	t.equal(error.message, "timeout")

	const info = { code: 7 }
	const withInfo = await rejection(timeout(1, info))
	t.equal(withInfo.message, "timeout")
	t.ok(withInfo.info === info)

	const withProto = await rejection(timeout(1, JSON.parse('{"__proto__":{"x":1}}')))
	t.ok(withProto instanceof Error)
	t.equal(withProto.x, undefined)
})

test("promise.timeout cancel", async (t) => {
	let settled = false
	const promise = timeout(20)
	const settle = () => { settled = true }
	promise.then(settle, settle)
	promise.cancel()
	await new Promise((resolve) => { setTimeout(resolve, 50) })
	t.ok(!settled)
})
