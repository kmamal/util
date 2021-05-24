const { map } = require('../../array/map')

const _camelCase = (str) => {
	const { length } = str
	const res = new Array(length)
	let write_index = 0

	let expect_leading = true
	let starts_word = true
	let is_first = true
	for (let i = 0; i < length; i++) {
		const char = str[i]
		if (char === '-' || char === '_') {
			starts_word = true
			if (!expect_leading) { continue }
			res[write_index++] = '_'
		} else {
			expect_leading = false
			if (starts_word) {
				res[write_index++] = is_first
					? char.toLowerCase()
					: char.toUpperCase()
				starts_word = false
				is_first = false
			} else {
				res[write_index++] = char
			}
		}
	}

	if (!expect_leading) {
		for (let i = length - 1; i >= 0; i--) {
			const char = str[i]
			if (char !== '-' && char !== '_')	{ break }
			res[write_index++] = '_'
		}
	}

	return res.join('')
}

const camelCase = (str) => {
	const parts = str.split(' ')
	map.$$$(parts, _camelCase)
	return parts.join(' ')
}

const isCamelCase = (str) => str === camelCase(str)

module.exports = {
	camelCase,
	isCamelCase,
}
