const { PARTS, getPart } = require('./parts')
const { shift } = require('./shift')

const floor$$$ = (date, targetPart) => {
	const args = []
	for (const part of PARTS) {
		const value = getPart(date, part)
		args.push(part === 'month' ? value - 1 : value)
		if (part === targetPart) { break }
	}
	date.setTime(Date.UTC(...args))
	return date
}

const floor = (date, targetPart) => {
	const res = new Date(date)
	return floor$$$(res, targetPart)
}

floor.$$$ = floor$$$

const ceil$$$ = (date, targetPart) => {
	floor$$$(date, targetPart)
	shift.$$$(date, targetPart, 1)
	return date
}

const ceil = (date, targetPart) => {
	const res = new Date(date)
	return ceil$$$(res, targetPart)
}

ceil.$$$ = ceil$$$

const round$$$ = (date, targetPart) => {
	const r = round(date, targetPart)
	date.setTime(r.getTime())
	return date
}

const round = (date, targetPart) => {
	const a = floor(date, targetPart)
	const b = shift(a, targetPart, 1)
	const t = date.getTime()
	const at = a.getTime()
	const bt = b.getTime()
	return (t - at) <= (bt - t) ? a : b
}

round.$$$ = round$$$

module.exports = {
	floor,
	ceil,
	round,
}
