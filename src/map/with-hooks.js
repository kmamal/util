
const withHooks = (hooks) => {
	const {
		factory,
		key,
	} = hooks

	const map = new Map()

	if (factory) {
		const _get = map.get
		map.get = (k, kk) => {
			if (!map.has(k)) {
				const v = factory(k, kk)
				map.set(k, v)
				return v
			}
			return _get.call(map, k)
		}
	}

	if (key) {
		const _has = map.has
		map.has = (k) => _has.call(map, key(k))

		const _get = map.get
		map.get = factory
			? (k) => _get.call(map, key(k), k)
			: (k) => _get.call(map, key(k))

		const _set = map.set
		map.set = (k, v) => _set.call(map, key(k), v)

		const _delete = map.delete
		map.delete = (k) => _delete.call(map, key(k))
	}

	return map
}

module.exports = { withHooks }
