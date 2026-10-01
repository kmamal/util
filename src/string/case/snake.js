const { map } = require('../../array/map')
const { __splitWords } = require('./split-words')

const map$$$ = map.$$$


const _snakeCase = (str) => {
	const { leading, words, trailing } = __splitWords(str)
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].toLowerCase()
	}
	return `${'_'.repeat(leading)}${words.join('_')}${'_'.repeat(trailing)}`
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
