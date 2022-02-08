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

const startOfWeek = (date) => {
	const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
	const day = monday.getUTCDay() || 7
	monday.setUTCDate(monday.getUTCDate() + 1 - day)
	return monday
}

module.exports = {
	getWeek,
	startOfWeek,
}
