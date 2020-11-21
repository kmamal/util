const { LeafTree } = require('../leaf-tree')
const { NodeTree } = require('../node-tree')
const { Hashtable } = require('../hashtable')
const { sub } = require('../../../operators')
const { rand } = require('../../../random')
const { chronometer } = require('../../../misc/chronometer')

const hash0 = (a) => a * 199

const hash1 = (a) => a * 2654435761

const hash2 = (a) => {
	const b = ((a >>> 16) ^ a) * 0x45d9f3b
	const c = ((b >>> 16) ^ b) * 0x45d9f3b
	const d = (c >>> 16) ^ c
	return d
}

const a = new Map()
const b = new NodeTree(sub)
const c = new LeafTree(sub)
const d = new Hashtable(hash0)
const e = new Hashtable(hash1)
const f = new Hashtable(hash2)

const K = 100
const V = 1000
const R = 1000000

const measureTime = (map) => chronometer(() => {
	for (let i = 0; i < R; i++) {
		const o = rand(4)
		switch (o) {
			case 0: {
				const key = rand(K)
				const value = rand(V)
				map.set(key, value)
			} break

			case 1: {
				const key = rand(K)
				map.delete(key)
			} break

			case 2: {
				const key = rand(K)
				map.get(key)
			} break

			case 3: {
				const key = rand(K)
				map.has(key)
			} break

				// No default
		}
	}
})

console.log(measureTime(a))
console.log(measureTime(b))
console.log(measureTime(c))
console.log(measureTime(d))
console.log(measureTime(e))
console.log(measureTime(f))
