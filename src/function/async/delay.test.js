const { test } = require('@xyz/tests')
const { delay } = require('.')

test('function.async.delay', (t) => new Promise((resolve) => {
	const { start, step } = t.schedule([
		[ 100, 1 ],
		[ 100, 3 ],
	])

	const fn = (x) => {
		step(x)
		if (x === 3) { process.nextTick(resolve) }
	}
	const delayed = delay(fn, 100)

	start()
	delayed(1)
	const cancel = delayed(2)
	delayed(3)
	cancel()
}))
