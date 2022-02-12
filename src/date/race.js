const { DURATION } = require('./duration')
const {
	_fromPartial,
	fromPartial,
	calcDaysSinceEpoch,
	calcDayOfWeek,
	fromTimestamp,
	_fromTimestamp,
	toTimestamp,
} = require('./date')
const { shiftYear, shiftDay } = require('./shift')
const { clone } = require('./clone')

const dDay = DURATION.day
const dWeek = 7 * dDay


const startOfWeekTimestamp = (timestamp) => {
	const daysSinceEpoch = calcDaysSinceEpoch(timestamp)
	const dayOfWeek = calcDayOfWeek(daysSinceEpoch)
	return (daysSinceEpoch - dayOfWeek) * dDay
}

const startOfWeek$$$ = (date) => {
	const timestamp = startOfWeekTimestamp(date.timestamp)
	_fromTimestamp(date, timestamp)
	return date
}

const startOfWeek = (date) => {
	const res = clone(date)
	return startOfWeek$$$(res)
}

startOfWeek.$$$ = startOfWeek$$$


const getWeek1 = (date) => {
	const year = date.year
	const janOne = fromPartial({ year, month: 1, day: 1 })
	const today = fromPartial({ year, month: date.month, day: date.day })

	let janOneDay = janOne.dayOfWeek + 1
	let offset = janOneDay > 4 ? -1 : 0
	let padding = janOneDay - 1
	let numDays = Math.round((today - janOne) / DURATION.days)
	let week = Math.floor((numDays + padding) / 7) + 1 + offset

	if (week > 0) { return week }

	shiftYear.$$$(janOne, -1)
	janOneDay = janOne.dayOfWeek + 1
	offset = janOneDay > 4 ? -1 : 0
	padding = janOneDay - 1
	numDays = Math.round((today - janOne) / DURATION.days)
	week = Math.floor((numDays + padding) / 7) + 1 + offset

	return week
}

const _firstWeekOfYear = (year) => {
	const timestamp = toTimestamp({ year, month: 1, day: 4 })
	return startOfWeekTimestamp(timestamp)
}

const getWeek2 = (date) => {
	const { year, timestamp } = date
	let yearStartTimestamp = _firstWeekOfYear(year)
	if (yearStartTimestamp > timestamp) {
		yearStartTimestamp = _firstWeekOfYear(year - 1)
	}
	return Math.floor((timestamp - yearStartTimestamp) / dWeek)
}


let s
const E = 1e6

s = Date.now()
{
	for (let i = 0; i < E; i++) {
		getWeek1(fromTimestamp(Math.floor(Math.random() * s)))
	}
}
console.log(Date.now() - s)

s = Date.now()
{
	for (let i = 0; i < E; i++) {
		getWeek2(fromTimestamp(Math.floor(Math.random() * s)))
	}
}
console.log(Date.now() - s)
