
const groupBy = (arr, fnMap) => {
	const res = {}
	for (const x of arr) {
		const key = fnMap(x)
		let list
		if (res[key] === undefined) {
			res[key] = list = []
		} else {
			list = res[key]
		}
		list.push(x)
	}
	return res
}

module.exports = { groupBy }
