
const EMPTY = []
const toIndex = (key) => typeof key === 'string' && parseInt(key, 10)

const fromHandlers = ({ get, set, length }) => new Proxy(EMPTY, {
	get: (wrapped, key) => {
		const index = toIndex(key)
		if (Number.isFinite(index)) { return get(index) }
		if (key === 'length') { return length() }
		return wrapped[key]
	},
	set: (wrapped, key, value) => {
		const index = toIndex(key)
		if (Number.isFinite(index)) {
			set(index, value)
		} else {
			wrapped[key] = value
		}
		return true
	},
})

module.exports = { fromHandlers }
