const { Array2d } = require('./class')

const fromFactory = (w, h, map) => {
	const arr = Array(w * h)
	let write_index = 0
	for (let j = 0; j < h; j++) {
		for (let i = 0; i < w; i++) {
			arr[write_index++] = map(i, j)
		}
	}
	return new Array2d(w, h, arr)
}

module.exports = { fromFactory }