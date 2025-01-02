const { nextToward } = require('../ieee-float/double')

const floorTo = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	return signX * Math.floor(absX / absUnit) * absUnit
}

const ceilTo = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	return signX * Math.ceil(absX / absUnit) * absUnit
}

const roundTo = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	return signX * Math.round(absX / absUnit) * absUnit
}

const fixFloatRounding = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	const mod = absX % absUnit
	if (mod === 0) { return x }
	const direction = mod > absUnit - mod ? Infinity : -Infinity
	return signX * nextToward(absX, direction)
}


module.exports = {
	floorTo,
	ceilTo,
	roundTo,
	fixFloatRounding,
}
