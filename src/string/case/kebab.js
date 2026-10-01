const { map } = require('../../array/map')
const { __splitWords } = require('./split-words')

const map$$$ = map.$$$


const _kebabCase = (str) => {
	const { leading, words, trailing } = __splitWords(str)
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].toLowerCase()
	}
	return `${'-'.repeat(leading)}${words.join('-')}${'-'.repeat(trailing)}`
}

const kebabCase = (str) => {
	const parts = str.split(' ')
	map$$$(parts, _kebabCase)
	return parts.join(' ')
}

const isKebabCase = (str) => str === kebabCase(str)

module.exports = {
	kebabCase,
	isKebabCase,
}
