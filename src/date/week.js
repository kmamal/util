const { DURATION } = require('./duration')

const getWeek = (date) => {
	const year = date.getUTCFullYear()
	const janOne = new Date(Date.UTC(year, 0, 1))
	const today = new Date(Date.UTC(year, date.getUTCMonth(), date.getUTCDate()))

	let janOneDay = janOne.getUTCDay() || 7
	let offset = janOneDay > 4 ? -1 : 0
	let padding = janOneDay - 1
	let numDays = Math.round((today - janOne) / DURATION.days)
	let week = Math.floor((numDays + padding) / 7) + 1 + offset

	if (week > 0) { return week }

	janOne.setFullYear(year - 1)
	janOneDay = janOne.getUTCDay() || 7
	offset = janOneDay > 4 ? -1 : 0
	padding = janOneDay - 1
	numDays = Math.round((today - janOne) / DURATION.days)
	week = Math.floor((numDays + padding) / 7) + 1 + offset

	return week
}

const offset = [ -6, null, -1, -2, -3, -4, -5 ]

const startOfWeek$$$ = (date) => {
	date.setTime(Date.UTC(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
	))
	const day = date.getUTCDay()
	if (day !== 1) { date.setUTCDate(date.getUTCDate() + offset[day]) }
	return date
}

const startOfWeek = (date) => {
	const res = new Date(date)
	return startOfWeek$$$(res)
}

startOfWeek.$$$ = startOfWeek$$$

module.exports = {
	getWeek,
	startOfWeek,
}
