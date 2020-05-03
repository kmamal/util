
class _Map extends Map {
	constructor (factory) {
		super()
		this._factory = factory
	}

	get (key) {
		if (!this.has(key)) {
			const value = this._factory(key)
			this.set(key, value)
			return value
		}
		return super.get(key)
	}
}

const fromFactory = (factory) => new _Map(factory)

module.exports = { fromFactory }
