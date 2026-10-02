const { test } = require('@kmamal/testing')
const { setOwn, getOwn, enumerateOwnKeys } = require('./own')

test("object.setOwn", (t) => {
	const obj = {}
	setOwn(obj, 'a', 1)
	setOwn(obj, '__proto__', { x: 1 })
	t.equal(Object.keys(obj), [ 'a', '__proto__' ])
	t.equal(Object.getPrototypeOf(obj), Object.prototype)
	t.equal(obj.x, undefined)
})

test("object.getOwn", (t) => {
	const obj = Object.create({ inherited: 1 })
	obj.own = 2
	t.equal(getOwn(obj, 'own'), 2)
	t.equal(getOwn(obj, 'inherited'), undefined)
	t.equal(getOwn(obj, 'toString'), undefined)
})

test("object.enumerateOwnKeys", (t) => {
	const s = Symbol('s')
	const hidden = Symbol('hidden')
	const obj = Object.create({ inherited: 1, [Symbol('inherited')]: 2 })
	obj.b = 1
	obj[s] = 2
	obj[1] = 3
	Object.defineProperty(obj, 'hiddenString', { value: 4, enumerable: false })
	Object.defineProperty(obj, hidden, { value: 5, enumerable: false })
	t.equal(enumerateOwnKeys(obj), [ '1', 'b', s ])
	t.equal(enumerateOwnKeys({}), [])
	t.equal(enumerateOwnKeys([ 1, 2 ]), [ '0', '1' ])
})
