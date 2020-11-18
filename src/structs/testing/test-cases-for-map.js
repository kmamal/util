const { test } = require('@xyz/testing')
const { rand } = require('../../random')
const { sortBy } = require('../../array')

const createTests = (name, constructor, args) => {
	const { [constructor]: M } = require(`../${name}`)

	test(`structs.${name}`, (t) => {
		const a = new M(...args)
		const b = new Map()

		const K = 100
		const V = 1000
		const R = 10000
		for (let i = 0; i < R; i++) {
			if (rand(2)) {
				const key = rand(K)
				const value = rand(V)
				// console.log('set', key, value) //
				a.set(key, value)
				b.set(key, value)
			} else {
				const key = rand(K)
				// console.log('delete', key) //
				a.delete(key)
				b.delete(key)
			}
			// a._print() //

			t.equal(a.size, b.size)

			for (let key = 0; key < K; key++) {
				t.equal(a.has(key), b.has(key), { key })
				t.equal(a.get(key), b.get(key), { key })
			}

			const a_entries = sortBy([ ...a.entries() ], ([ key ]) => key)
			const b_entries = sortBy([ ...b.entries() ], ([ key ]) => key)
			t.equal(a_entries, b_entries)
		}
	})
}

module.exports = { createTests }
