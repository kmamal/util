const { randInt } = require('./rand-int')

const $_shuffle_$ = (arr) => {
	const { length } = arr
	for (let i = 0; i < length - 1; i++) {
		const index = randInt(i, length)
		const tmp = arr[index]
		arr[index] = arr[i]
		arr[i] = tmp
	}
	return arr
}

const shuffle = (arr) => {
	const result = Array.from(arr)
	return $_shuffle_$(result)
}
shuffle.$$$ = $_shuffle_$

module.exports = { shuffle }
