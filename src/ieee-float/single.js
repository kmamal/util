const BYTES = 4
const MANTISSA_BITS = 23
const MANTISSA_MASK = 2 ** MANTISSA_BITS - 1
const HIDDEN_BIT = 2 ** MANTISSA_BITS
const EXPONENT_BITS = 8
const EXPONENT_MASK = 2 ** EXPONENT_BITS - 1
const EXPONENT_BIAS = 2 ** (EXPONENT_BITS - 1) - 1

const toBuffer = (value) => {
	const buffer = Buffer.alloc(BYTES)
	buffer.writeFloatBE(value, 0)
	return buffer
}

const fromBuffer = (buffer) => buffer.readFloatBE(0)

const sign = (value) => {
	const buffer = toBuffer(value)
	return buffer[0] >> 7
}

const exponent = (value) => {
	const buffer = toBuffer(value)
	return buffer.readUInt16BE(0) >> 7 & EXPONENT_MASK
}

const mantissa = (value) => {
	const buffer = toBuffer(value)
	return buffer.readUInt32BE(0) & MANTISSA_MASK
}

const parse = (value) => ({
	sign: sign(value),
	exponent: exponent(value),
	mantissa: mantissa(value),
})

// TODO: is it faster to just do math?
const _from1 = (s, e, m) => {
	const buffer = Buffer.alloc(BYTES)
	const value = 0
		 | ((s & 0x01) << 32 - 1)
		 | ((e & EXPONENT_MASK) << 32 - EXPONENT_BITS)
		 | ((m & MANTISSA_MASK))
	buffer.writeUInt32BE(value, 0)
	return fromBuffer(buffer)
}

const _from2 = (s, e, m) => {
	const _s = s ? -1 : 1
	const _e = 2 ** (e - EXPONENT_BIAS - MANTISSA_BITS)
	const _m = HIDDEN_BIT + m
	return _s * _e * _m
}

const from = ({ sign: s = 0, exponent: e = 0, mantissa: m = 0 }) => _from1(s, e, m)

const nextToward = (value, target) => {
	if (Number.isNaN(value) || Number.isNaN(target)) { return NaN }
	if (value === target) { return value }

	const buffer = toBuffer(value)
	const unsigned = buffer.readUInt32BE(0)
	const direction = target > value ? 1 : -1
	const increment = value > 0 ? direction : -direction
	buffer.writeUInt32BE(unsigned + increment, 0)
	return fromBuffer(buffer)
}


module.exports = {
	MANTISSA_BITS,
	EXPONENT_BITS,
	toBuffer,
	sign,
	exponent,
	mantissa,
	parse,
	_from1,
	_from2,
	from,
	nextToward,
}
