const { map } = require('../../array/map')
const { isUpperCase } = require('./upper')

const _kebabCase = (str) => {
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
			if (isUpperCase(char)) {
				starts_word = true
			}

			expect_leading = false
			if (starts_word) {
				starts_word = false
				if (!is_first) {
					res[write_index++] = '_'
				}
				is_first = false
			}
			res[write_index++] = char.toLowerCase()
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

const kebabCase = (str) => {
	const parts = str.split(' ')
	map.$$$(parts, _kebabCase)
	return parts.join(' ')
}

const isKebabCase = (str) => str === kebabCase(str)

module.exports = {
	kebabCase,
	isKebabCase,
}
