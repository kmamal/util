const { PARTS, getPart } = require('./parts')
const { shift } = require('./shift')

const _floorTimestamp = (date, targetPart) => {
	const args = []
	for (const part of PARTS) {
		args.push(getPart(date, part, true))
		if (part === targetPart) { break }
	}
	return Date.UTC(...args)
}

const floor$$$ = (date, targetPart) => {
	date.setTime(_floorTimestamp(date, targetPart))
	return date
}

const floor = (date, targetPart) => {
	const timestamp = _floorTimestamp(date, targetPart)
	return new Date(timestamp)
}

floor.$$$ = floor$$$

const ceil$$$ = (date, targetPart) => {
	const origTimestamp = date.getTime()
	const floorTimestamp = _floorTimestamp(date, targetPart)
	if (origTimestamp !== floorTimestamp) {
		date.setTime(floorTimestamp)
		shift.$$$(date, targetPart, 1)
	}
	return date
}

const ceil = (date, targetPart) => {
	const res = new Date(date)
	return ceil$$$(res, targetPart)
}

ceil.$$$ = ceil$$$

const round$$$ = (date, targetPart) => {
	const t = date.getTime()

	floor.$$$(date, targetPart)
	const at = date.getTime()
	if (t === at) { return date }

	const b = shift.$$$(date, targetPart, 1)
	const bt = b.getTime()
	if ((bt - t) <= (t - at)) { return date }

	date.setTime(at)
	return date
}

const round = (date, targetPart) => {
	const res = new Date(date)
	return round$$$(res, targetPart)
}

round.$$$ = round$$$

module.exports = {
	floor,
	ceil,
	round,
}
