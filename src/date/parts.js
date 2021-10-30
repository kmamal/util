const { pick } = require('../object/pick')

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
		millisecond: date.getMilliseconds(),
	}
}

const fromParts = (parts) => {
	const args = []
	for (const key of PARTS) {
		const part = parts[key]
		if (part === undefined) { break }
		args.push(part)
	}
	if (args.length === 1) { args.push(0) }
	return new Date(...args).getTime()
}

const fromPartsUntil = (parts, until) => {
	const untilIndex = PARTS.indexOf(until) + 1
	const partNames = PARTS.slice(0, untilIndex)
	const pickedParts = pick(parts, partNames)
	return fromParts(pickedParts)
}

module.exports = {
	PARTS,
	toParts,
	fromParts,
	fromPartsUntil,
}
