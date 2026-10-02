const { test } = require('@kmamal/testing')
const { throttle } = require('./throttle')
const { sleep } = require('../../promise/sleep')

test("function.async.throttle", (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([
		[ 100, 3 ],
		[ 250, 5 ],
	])

	const fn = (x) => {
		step(x)
		if (x === 5) { process.nextTick(resolve) }
	}
	const throttled = throttle(fn, 100)

	start()
	throttled(1)
	throttled(2)
	throttled(3)
	setTimeout(() => {
		throttled(4)
		throttled(5)
	}, 150)
}))

test("function.async.throttle Leading single call", async (t) => {
	const calls = []
	const wrapped = throttle((x) => { calls.push(x) }, 20, { leading: true })
	await wrapped('only')
	await wrapped.flush()
	t.equal(calls, [ 'only' ])
})

test("function.async.throttle Leading error", async (t) => {
	const wrapped = throttle(() => { throw new Error('lead') }, 20, { leading: true, trailing: false })
	await t.throwsAsync(() => wrapped())
	await wrapped.flush()
})

test("function.async.throttle Trailing error", async (t) => {
	const wrapped = throttle(() => { throw new Error('trail') }, 20)
	await t.throwsAsync(() => wrapped())
})

test("function.async.throttle Result of slow fn", async (t) => {
	const wrapped = throttle((x) => sleep(50).then(() => x), 10, { leading: true, trailing: false })
	t.equal(await wrapped('A'), 'A')
	t.equal(await wrapped('B'), 'B')
})

test("function.async.throttle Reentrant", async (t) => {
	const check = async (reentrant) => {
		let running = 0
		let maxRunning = 0
		const wrapped = throttle(async () => {
			running += 1
			maxRunning = Math.max(maxRunning, running)
			await sleep(60)
			running -= 1
		}, 10, { leading: true, trailing: false, reentrant })
		const first = wrapped()
		await sleep(20)
		await Promise.all([ first, wrapped() ])
		return maxRunning
	}
	t.equal(await check(false), 1)
	t.equal(await check(true), 2)
})

test("function.async.throttle Leading and trailing spacing", async (t) => {
	const times = []
	const start = Date.now()
	const wrapped = throttle((x) => {
		times.push([ x, Date.now() - start ])
		return x
	}, 100, { leading: true, trailing: true })

	const p1 = wrapped(1)
	await sleep(50)
	const p2 = wrapped(2)
	await sleep(55)
	const p3 = wrapped(3)
	t.equal(await Promise.all([ p1, p2, p3 ]), [ 1, 2, 3 ])

	t.equal(times.map(([ x ]) => x), [ 1, 2, 3 ])
	for (let i = 1; i < times.length; i++) {
		t.ok(times[i][1] - times[i - 1][1] >= 95, { times })
	}
	await wrapped.flush()
})

test("function.async.throttle Flush skips cooldown", async (t) => {
	const calls = []
	const wrapped = throttle((x) => { calls.push(x) }, 1000, { leading: true, trailing: true })
	wrapped(1)
	wrapped(2)
	const start = Date.now()
	await wrapped.flush()
	t.equal(calls, [ 1, 2 ])
	t.ok(Date.now() - start < 100)
})
