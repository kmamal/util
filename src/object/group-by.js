const { empty$$$ } = require('./empty')
const { setOwn, getOwn } = require('./own')

const __groupBy = (dst, arr, start, end, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fnMap(item)
		let list = getOwn(dst, key)
		if (list === undefined) {
			list = []
			setOwn(dst, key, list)
		}
		list.push(item)
	}
	return dst
}


const groupBy = (arr, fnMap) => {
	const res = Object.create(null)
	__groupBy(res, arr, 0, arr.length, fnMap)
	return res
}

const groupByTo = (dst, arr, fnMap) => {
	empty$$$(dst)
	__groupBy(dst, arr, 0, arr.length, fnMap)
	return dst
}

groupBy.to = groupByTo


module.exports = {
	__groupBy,
	groupBy,
}
