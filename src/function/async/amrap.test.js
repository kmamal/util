const { test } = require('@kmamal/testing')
const { amrap } = require('./amrap')

const busy = (n) => {
	let x = 0
	for (let i = 0; i < n * 1000; i++) { x += i }
	return x
}

test("function.async.amrap", (t) => {
	const batches = []
	const { elapsed, reps } = amrap((n) => {
		batches.push(n)
		busy(n)
	}, 50)
	t.ok(elapsed >= 50)
	t.equal(reps, batches.reduce((a, b) => a + b, 0))
	t.equal(batches.slice(0, 3), [ 1, 10, 100 ])
	t.ok(batches.every((n) => Number.isInteger(n) && n > 0))
})

test("function.async.amrap safety below one", (t) => {
	const batches = []
	const { reps } = amrap((n) => {
		batches.push(n)
		busy(n)
	}, 50, { safety: 0.5 })
	t.equal(batches[0], 1)
	t.ok(batches.every((n) => Number.isInteger(n) && n > 0))
	t.equal(reps, batches.reduce((a, b) => a + b, 0))
})

test("function.async.amrap initial", (t) => {
	const batches = []
	amrap((n) => {
		batches.push(n)
		busy(n)
	}, 10, { initial: 0 })
	t.equal(batches[0], 1)
	t.ok(batches.every((n) => Number.isInteger(n) && n > 0))

	const first = []
	amrap((n) => {
		first.push(n)
		busy(n)
	}, 10, { initial: 7, safety: 0.5 })
	t.equal(first[0], 7)
})

test("function.async.amrap done", (t) => {
	let calls = 0
	const { reps } = amrap(() => {
		calls += 1
		return calls === 3
	}, 1000)
	t.equal(calls, 3)
	t.equal(reps, 111)
})
