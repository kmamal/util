const { PARTS } = require('./parts')

const shift$$$ = (date, key, x) => {
	switch (key) {
		case 'year': { date.setFullYear(date.getFullYear() + x); break }
		case 'month': { date.setMonth(date.getMonth() + x); break }
		case 'day': { date.setDate(date.getDate() + x); break }
		case 'hour': { date.setHours(date.getHours() + x); break }
		case 'minute': { date.setMinutes(date.getMinutes() + x); break }
		case 'second': { date.setSeconds(date.getSeconds() + x); break }
		case 'millisecond': { date.setMilliseconds(date.getMilliseconds() + x); break }
		default: {
			const error = new Error("no such part")
			error.part = key
			error.expected = PARTS
			throw error
		}
	}
	return date
}

const shift = (date, key, x) => {
	const res = new Date(date)
	shift$$$(res, key, x)
	return res
}

shift.$$$ = shift$$$

module.exports = { shift }
