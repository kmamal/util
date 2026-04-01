const { map } = require('../../array/map')
const { isUpperCase } = require('./upper')

const map$$$ = map.$$$


const _snakeCase = (str) => {
	const { length } = str
	const res = new Array(length)
	let writeIndex = 0

	let expectLeading = true
	let startsWord = true
	let isFirst = true
	for (let i = 0; i < length; i++) {
		const char = str[i]
		if (char === '-' || char === '_') {
			startsWord = true
			if (!expectLeading) { continue }
			res[writeIndex++] = '_'
		}
		else {
			if (isUpperCase(char)) {
				startsWord = true
			}

			expectLeading = false
			if (startsWord) {
				startsWord = false
				if (!isFirst) {
					res[writeIndex++] = '_'
				}
				isFirst = false
			}
			res[writeIndex++] = char.toLowerCase()
		}
	}

	if (!expectLeading) {
		for (let i = length - 1; i >= 0; i--) {
			const char = str[i]
			if (char !== '-' && char !== '_')	{ break }
			res[writeIndex++] = '_'
		}
	}

	return res.join('')
}

const snakeCase = (str) => {
	const parts = str.split(' ')
	map$$$(parts, _snakeCase)
	return parts.join(' ')
}

const isSnakeCase = (str) => str === snakeCase(str)

module.exports = {
	snakeCase,
	isSnakeCase,
}
