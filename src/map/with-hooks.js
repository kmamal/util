
const withHooks = (hooks) => {
	const {
		factory,
		key,
	} = hooks

	const map = new Map()
	const {
		has: original_has,
		get: original_get,
		set: original_set,
		delete: original_delete,
	} = map

	let factory_get
	if (factory) {
		map.get = factory_get = (k, kk) => {
			if (!original_has.call(map, k)) {
				const v = factory(k, kk)
				original_set.call(map, k, v)
				return v
			}
			return original_get.call(map, k)
		}
	}

	if (key) {
		map.has = (k) => original_has.call(map, key(k))
		map.get = factory
			? (k) => factory_get.call(map, key(k), k)
			: (k) => original_get.call(map, key(k))
		map.set = (k, v) => original_set.call(map, key(k), v)
		map.delete = (k) => original_delete.call(map, key(k))
	}

	return map
}

module.exports = { withHooks }
