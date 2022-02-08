
const _isLeapYear = (year) => false
	|| year % 400 === 0
	|| (true
		&& year % 4 === 0
		&& year % 100 !== 0
	)

const isLeapYear = (date) => {
	const year = date.getUTCFullYear()
	return _isLeapYear(year)
}

module.exports = {
	_isLeapYear,
	isLeapYear,
}
