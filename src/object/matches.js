const { hasOwn, enumerateOwnKeys } = require('./own')

const _eq = (a, b) => a === b ? true : undefined

const _matchesWith = (a, b, fnEq, prop, _seen) => {
	const res = fnEq(a, b, prop)
	if (res !== undefined) { return res }

	// Primitive types and functions
	if (a === b) { return true }
	if (Number.isNaN(a) && Number.isNaN(b)) { return true }
	if (a === null || b === null) { return false } // Since `typeof null === 'object'`, but we want to handle it here

	const aType = typeof a
	const bType = typeof b
	if (aType !== bType) { return false }

	if (bType !== 'object') { return false } // Should have been handled in `a === b`

	const seen = _seen ?? new Map()

	let bs = seen.get(a)
	if (bs === undefined) {
		bs = new Set()
		seen.set(a, bs)
	}
	else if (bs.has(b)) {
		return true
	}

	bs.add(b)
	let result = true
	const bKeys = enumerateOwnKeys(b)
	for (let i = 0; i < bKeys.length; i++) {
		const key = bKeys[i]
		if (!hasOwn(a, key) || !_matchesWith(a[key], b[key], fnEq, key, seen)) {
			result = false
			break
		}
	}
	bs.delete(b)
	return result
}

const matchesWith = (obj, pattern, fnEq) => _matchesWith(obj, pattern, fnEq, undefined, null)

const matches = (obj, pattern) => _matchesWith(obj, pattern, _eq, undefined, null)

module.exports = {
	matchesWith,
	matches,
}
