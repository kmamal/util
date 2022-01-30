
const unweave = (arr, num) => {
	const { length } = arr
	const div = Math.floor(length / num)
	const mod = length % num

	let resIndex = 0

	const res = new Array(num)
	{
		const divp1 = div + 1
		while (resIndex < mod) {
			res[resIndex++] = new Array(divp1)
		}

		while (resIndex < num) {
			res[resIndex++] = new Array(div)
		}
	}

	let readIndex = 0
	let depth = 0
	while (depth < div) {
		for (let i = 0; i < num; i++) {
			res[i][depth] = arr[readIndex++]
		}
		depth++
	}

	for (let i = 0; i < mod; i++) {
		res[i][depth] = arr[readIndex++]
	}

	return res
}

module.exports = { unweave }
