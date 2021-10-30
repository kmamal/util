
const PARTS = [
	'year',
	'month',
	'day',
	'hour',
	'minute',
	'second',
	'millisecond',
]

const toParts = (timestamp) => {
	const date = new Date(timestamp)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
	}
}

const fromParts = (parts, until) => {
	const args = []
	for (const key of PARTS) {
		args.push(parts[key])
		if (key === until) { break }
	}
	return new Date(...args).getTime()
}

module.exports = {
	PARTS,
	toParts,
	fromParts,
}
