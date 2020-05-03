const sample = (iterable, n, fn) => {
	//
}

const sampleIndexes = (iterable, n) => sample(iterable, n, (x, i) => i)

const sampleValues = (iterable, n) => sample(iterable, n, (x) => x)

module.exports = {
	sampleIndexes,
	sampleValues,
}
