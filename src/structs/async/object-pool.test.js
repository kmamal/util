const { test } = require('@xyz/testing')
const { ObjectPool } = require('./object-pool')
const { sleep } = require('../../promise/sleep')

test("structs.object-pool", async (t) => {
	t.timeout(500)
	const s = t.schedule([
		[ 0, 1 ],
		[ 0, 2 ],
		[ 50, 3 ],
		[ 100, 4 ],
	])

	const a = new ObjectPool()
	s.start()

	a.release(2)
	a.release(1)
	a.reserve().then((x) => { s.step(x) })
	a.reserve().then((x) => { s.step(x) })
	a.reserve().then((x) => { s.step(x) })
	a.reserve().then((x) => { s.step(x) })

	await sleep(50)
	a.release(3)

	await sleep(50)
	a.release(4)
})
