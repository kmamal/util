
const slice = (array, start, end) => {
	const [ start_i, start_j ] = start
	const [ end_i, end_j ] = end
	const result = array.slice(start_j, end_j)
	for (let j = 0; j < result.length; j++) {
		result[j] = result[j].slice(start_i, end_i)
	}
	return result
}

module.exports = { slice }
