const { map } = require('../../array/map')
const { __splitWords } = require('./split-words')
const { upperFirst } = require('./upper-first')

const map$$$ = map.$$$


const _pascalCase = (str) => {
	const { leading, words, trailing } = __splitWords(str)
	for (let i = 0; i < words.length; i++) {
		words[i] = upperFirst(words[i].toLowerCase())
	}
	return `${'_'.repeat(leading)}${words.join('')}${'_'.repeat(trailing)}`
}

const pascalCase = (str) => {
	const parts = str.split(' ')
	map$$$(parts, _pascalCase)
	return parts.join(' ')
}

const isPascalCase = (str) => str === pascalCase(str)

module.exports = {
	pascalCase,
	isPascalCase,
}
