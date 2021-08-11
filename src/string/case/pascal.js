const { map } = require('../../array/map')

const _pascalCase = (str) => {
	const { length } = str
	const res = new Array(length)
	let write_index = 0

	let expect_leading = true
	let starts_word = true
	for (let i = 0; i < length; i++) {
		const char = str[i]
		if (char === '-' || char === '_') {
			starts_word = true
			if (!expect_leading) { continue }
			res[write_index++] = '_'
		} else {
			expect_leading = false
			if (starts_word) {
				res[write_index++] = char.toUpperCase()
				starts_word = false
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

const pascalCase = (str) => {
	const parts = str.split(' ')
	map.$$$(parts, _pascalCase)
	return parts.join(' ')
}

const isPascalCase = (str) => str === pascalCase(str)

module.exports = {
	pascalCase,
	isPascalCase,
}
