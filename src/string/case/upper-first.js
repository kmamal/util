
const upperFirst = (str) => {
	if (str === '') { return str }
	const size = str.codePointAt(0) > 0xffff ? 2 : 1
	return `${str.slice(0, size).toUpperCase()}${str.slice(size)}`
}

const isUpperFirst = (str) => str === upperFirst(str)

module.exports = {
	upperFirst,
	isUpperFirst,
}
