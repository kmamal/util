const { isLeapYear } = require('./year')

const DAYS_IN_MONTH = [ 31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

const getDaysInMonth = (date) => {
	const month = date.getUTCMonth()
	if (month !== 1) { return DAYS_IN_MONTH[month] }
	return isLeapYear(date) ? 29 : 28
}

module.exports = { getDaysInMonth }
