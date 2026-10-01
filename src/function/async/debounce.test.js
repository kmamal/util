const { test } = require('@kmamal/testing')
const { debounce } = require('./debounce')
const { sleep } = require('../../promise/sleep')

test("function.async.debounce", (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([ [ 100, 2 ] ])

	const fn = (x) => {
		step(x)
		if (x === 2) { process.nextTick(resolve) }
	}
	const debounced = debounce(fn, 100)

	start()
	debounced(1)
	debounced(2)
}))

test("function.async.debounce Leading true", (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([
		[ 0, 1 ],
		[ 100, 3 ],
	])

	const fn = (x) => {
		step(x)
		if (x === 3) { process.nextTick(resolve) }
	}
	const debounced = debounce(fn, 100, { leading: true })

	start()
	debounced(1)
	debounced(2)
	debounced(3)
}))

test("function.async.debounce Trailing false", (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([
		[ 0, 1 ],
		[ 150, 4 ],
	])

	const fn = (x) => {
		step(x)
		if (x === 4) { process.nextTick(resolve) }
	}
	const debounced = debounce(fn, 100, { leading: true, trailing: false })

	start()
	debounced(1)
	debounced(2)
	debounced(3)

	setTimeout(() => { debounced(4) }, 150)
}))

test("function.async.debounce Cancel", (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([
		[ 0, 1 ],
		[ 0, 4 ],
	])

	const fn = (x) => {
		step(x)
		if (x === 4) { process.nextTick(resolve) }
	}
	const debounced = debounce(fn, 100, { leading: true, trailing: false })

	start()
	debounced(1)
	debounced(2)
	debounced(3)
	debounced.cancel()
	debounced(4)
}))

test("function.async.debounce Flush", (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([ [ 50, 2 ] ])

	const fn = (x) => {
		step(x)
		if (x === 2) { process.nextTick(resolve) }
	}
	const debounced = debounce(fn, 100)

	start()
	debounced(1)
	debounced(2)
	setTimeout(() => { debounced.flush() }, 50)
}))

test("function.async.debounce Leading single call", async (t) => {
	const calls = []
	const wrapped = debounce((x) => { calls.push(x) }, 20, { leading: true })
	await wrapped('only')
	await wrapped.flush()
	t.equal(calls, [ 'only' ])
})

test("function.async.debounce Leading error", async (t) => {
	const wrapped = debounce(() => { throw new Error('lead') }, 20, { leading: true, trailing: false })
	await t.throwsAsync(() => wrapped())
	await wrapped.flush()
})

test("function.async.debounce Trailing error", async (t) => {
	const wrapped = debounce(() => { throw new Error('trail') }, 20)
	await t.throwsAsync(() => wrapped())
})

test("function.async.debounce Result of slow fn", async (t) => {
	const wrapped = debounce((x) => sleep(50).then(() => x), 10, { leading: true, trailing: false })
	t.equal(await wrapped('A'), 'A')
	t.equal(await wrapped('B'), 'B')
})

test("function.async.debounce Reentrant", async (t) => {
	const check = async (reentrant) => {
		let running = 0
		let maxRunning = 0
		const wrapped = debounce(async () => {
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
