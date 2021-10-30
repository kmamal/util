
const getWeek = (date) => {
	const year = date.getFullYear()
	const today = new Date(year, date.getMonth(), date.getDate())

	let janOne = new Date(year, 0, 1)
	let offset = (janOne.getDay() || 7) > 4 ? -1 : 0
	let padding = (janOne.getDay() || 7) - 1
	let numDays = Math.round((today - janOne) / (24 * 60 * 60e3))
	let week = Math.floor((numDays + padding) / 7) + 1 + offset

	if (week > 0) { return week }

	janOne = new Date(year - 1, 0, 1)
	offset = (janOne.getDay() || 7) > 4 ? -1 : 0
	padding = (janOne.getDay() || 7) - 1
	numDays = Math.round((today - janOne) / (24 * 60 * 60e3))
	week = Math.floor((numDays + padding) / 7) + 1 + offset

	return week
}

module.exports = { getWeek }
