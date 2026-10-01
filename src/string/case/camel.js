const { map } = require('../../array/map')
const { __splitWords } = require('./split-words')
const { upperFirst } = require('./upper-first')

const map$$$ = map.$$$


const _camelCase = (str) => {
	const { leading, words, trailing } = __splitWords(str)
	for (let i = 0; i < words.length; i++) {
		const word = words[i].toLowerCase()
		words[i] = i === 0 ? word : upperFirst(word)
	}
	return `${'_'.repeat(leading)}${words.join('')}${'_'.repeat(trailing)}`
}

const camelCase = (str) => {
	const parts = str.split(' ')
	map$$$(parts, _camelCase)
	return parts.join(' ')
}

const isCamelCase = (str) => str === camelCase(str)

module.exports = {
	camelCase,
	isCamelCase,
}
