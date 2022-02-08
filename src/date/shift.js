
const shift$$$ = (date, key, x) => {
	switch (key) {
		case 'years':
		case 'year': {
			date.setUTCFullYear(date.getUTCFullYear() + x)
		} break
		case 'months':
		case 'month': {
			date.setUTCMonth(date.getUTCMonth() + x)
		} break
		case 'days':
		case 'day': {
			date.setUTCDate(date.getUTCDate() + x)
		} break
		case 'hours':
		case 'hour': {
			date.setUTCHours(date.getUTCHours() + x)
		} break
		case 'minutes':
		case 'minute': {
			date.setUTCMinutes(date.getUTCMinutes() + x)
		} break
		case 'seconds':
		case 'second': {
			date.setUTCSeconds(date.getUTCSeconds() + x)
		} break
		case 'milliseconds':
		case 'millisecond': {
			date.setUTCMilliseconds(date.getUTCMilliseconds() + x)
		} break
		default: return null
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
