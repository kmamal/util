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

const getPart = (date, key) => {
	switch (key) {
		case 'years':
		case 'year': return date.getUTCFullYear()
		case 'months':
		case 'month': return date.getUTCMonth() + 1
		case 'days':
		case 'day': return date.getUTCDate()
		case 'hours':
		case 'hour': return date.getUTCHours()
		case 'minutes':
		case 'minute': return date.getUTCMinutes()
		case 'seconds':
		case 'second': return date.getUTCSeconds()
		case 'milliseconds':
		case 'millisecond': return date.getUTCMilliseconds()
		default: return null
	}
}

const toParts = (date) => ({
	year: getPart(date, 'year'),
	month: getPart(date, 'month'),
	week: getPart(date, 'week'),
	day: getPart(date, 'day'),
	hour: getPart(date, 'hour'),
	minute: getPart(date, 'minute'),
	second: getPart(date, 'second'),
	millisecond: getPart(date, 'millisecond'),
})

const fromParts = (parts) => {
	const args = []
	for (const key of PARTS) {
		const part = parts[key]
		if (part === undefined) { break }
		args.push(key === 'month' ? part - 1 : part)
	}
	return new Date(Date.UTC(...args))
}

const fromPartsUntil = (parts, until) => {
	const untilIndex = PARTS.indexOf(until) + 1
	const partNames = PARTS.slice(0, untilIndex)
	const pickedParts = pick(parts, partNames)
	return fromParts(pickedParts)
}

module.exports = {
	PARTS,
	getPart,
	toParts,
	fromParts,
	fromPartsUntil,
}
