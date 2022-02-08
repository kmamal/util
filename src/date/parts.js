
const PARTS = [
	'year',
	'month',
	'day',
	'hour',
	'minute',
	'second',
	'millisecond',
]

const getYear = (date) => date.getUTCFullYear()
const getMonth = (date) => date.getUTCMonth() + 1
const getMonthRaw = (date) => date.getUTCMonth()
const getDay = (date) => date.getUTCDate()
const getHour = (date) => date.getUTCHours()
const getMinute = (date) => date.getUTCMinutes()
const getSecond = (date) => date.getUTCSeconds()
const getMillisecond = (date) => date.getUTCMilliseconds()

const setYear = (date, value) => date.setUTCFullYear(value)
const setMonth = (date, value) => date.setUTCMonth(value - 1)
const setMonthRaw = (date, value) => date.setUTCMonth(value)
const setDay = (date, value) => date.setUTCDay(value)
const setHour = (date, value) => date.setUTCHours(value)
const setMinute = (date, value) => date.setUTCMinutes(value)
const setSecond = (date, value) => date.setUTCSeconds(value)
const setMillisecond = (date, value) => date.setUTCMilliseconds(value)

const getPart = (date, part, raw = false) => {
	switch (part) {
		case 'years': case 'year': return getYear(date)
		case 'months': case 'month': return raw
			? getMonthRaw(date)
			: getMonth(date)
		case 'days': case 'day': return getDay(date)
		case 'hours': case 'hour': return getHour(date)
		case 'minutes': case 'minute': return getMinute(date)
		case 'seconds': case 'second': return getSecond(date)
		case 'milliseconds': case 'millisecond': return getMillisecond(date)
		default: return null
	}
}

const setPart = (date, part, value, raw = false) => {
	switch (part) {
		case 'years': case 'year': return setYear(date, value)
		case 'months': case 'month': return raw
			? setMonthRaw(date, value)
			: setMonth(date, value)
		case 'days': case 'day': return setDay(date, value)
		case 'hours': case 'hour': return setHour(date, value)
		case 'minutes': case 'minute': return setMinute(date, value)
		case 'seconds': case 'second': return setSecond(date, value)
		case 'milliseconds': case 'millisecond': return setMillisecond(date, value)
		default: return null
	}
}

const toParts = (date) => ({
	year: getPart(date, 'year'),
	month: getPart(date, 'month'),
	day: getPart(date, 'day'),
	hour: getPart(date, 'hour'),
	minute: getPart(date, 'minute'),
	second: getPart(date, 'second'),
	millisecond: getPart(date, 'millisecond'),
})

const _fromParts = (parts, partNames) => {
	const args = []
	for (const part of partNames) {
		const value = parts[part]
		if (value === undefined) { break }
		args.push(part === 'month' ? value - 1 : value)
	}
	return new Date(Date.UTC(...args))
}

const fromParts = (parts) => _fromParts(parts, PARTS)

const fromPartsUntil = (parts, until) => {
	const partNames = PARTS.slice(0, PARTS.indexOf(until) + 1)
	return _fromParts(parts, partNames)
}

module.exports = {
	PARTS,
	getYear,
	getMonth,
	getDay,
	getHour,
	getMinute,
	getSecond,
	getMillisecond,
	setYear,
	setMonth,
	setDay,
	setHour,
	setMinute,
	setSecond,
	setMillisecond,
	getPart,
	setPart,
	toParts,
	fromParts,
	fromPartsUntil,
}
