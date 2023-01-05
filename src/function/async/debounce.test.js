const { test } = require('@kmamal/testing')
const { debounce } = require('./debounce')

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

// test("function.async.debounce Leading true", (t) => new Promise((resolve) => {
// 	const { start, step } = t.schedule([
// 		[ 0, 1 ],
// 		[ 100, 3 ],
// 	])

// 	const fn = (x) => {
// 		step(x)
// 		if (x === 3) { process.nextTick(resolve) }
// 	}
// 	const debounced = debounce(fn, 100, { leading: true })

// 	start()
// 	debounced(1)
// 	debounced(2)
// 	debounced(3)
// }))

// test("function.async.debounce Trailing false", (t) => new Promise((resolve) => {
// 	const { start, step } = t.schedule([
// 		[ 0, 1 ],
// 		[ 150, 4 ],
// 	])

// 	const fn = (x) => {
// 		step(x)
// 		if (x === 4) { process.nextTick(resolve) }
// 	}
// 	const debounced = debounce(fn, 100, { leading: true, trailing: false })

// 	start()
// 	debounced(1)
// 	debounced(2)
// 	debounced(3)

// 	setTimeout(() => { debounced(4) }, 150)
// }))

// test("function.async.debounce Cancel", (t) => new Promise((resolve) => {
// 	const { start, step } = t.schedule([
// 		[ 0, 1 ],
// 		[ 0, 4 ],
// 	])

// 	const fn = (x) => {
// 		step(x)
// 		if (x === 4) { process.nextTick(resolve) }
// 	}
// 	const debounced = debounce(fn, 100, { leading: true, trailing: false })

// 	start()
// 	debounced(1)
// 	debounced(2)
// 	debounced(3)
// 	debounced.cancel()
// 	debounced(4)
// }))

// test("function.async.debounce Flush", (t) => new Promise((resolve) => {
// 	const { start, step } = t.schedule([ [ 50, 2 ] ])

// 	const fn = (x) => {
// 		step(x)
// 		if (x === 2) { process.nextTick(resolve) }
// 	}
// 	const debounced = debounce(fn, 100)

// 	start()
// 	debounced(1)
// 	debounced(2)
// 	setTimeout(() => { debounced.flush() }, 50)
// }))
