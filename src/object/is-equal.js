
const isEqual = (a, b) => {
	// Primitive types and functions
	if (a === b) { return true }
	if (Number.isNaN(a) && Number.isNaN(b)) { return true }
	if (a === null || b === null) { return false } // Since `typeof null === 'object'`, but we want to handle it here

	const a_type = typeof a
	const b_type = typeof b
	if (a_type !== b_type) { return false }

	if (a_type !== 'object') { return false } // Should have been handled in `a === b`

	// Array
	const a_is_array = Array.isArray(a)
	const b_is_array = Array.isArray(b)
	if (a_is_array !== b_is_array) { return false }

	if (a_is_array) {
		const a_length = a.length
		const b_length = b.length
		if (a_length !== b_length) { return false }

		for (let i = 0; i < a_length; i++) {
			if (!isEqual(a[i], b[i])) { return false }
		}
		return true
	}

	// Object
	for (const key of Object.keys(a)) {
		if (!isEqual(a[key], b[key])) { return false }
	}

	for (const key of Object.keys(b)) {
		if (!isEqual(a[key], b[key])) { return false }
	}

	return true
}

module.exports = { isEqual }
