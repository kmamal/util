const MANTISSA_LENGTH = 52
const EXPONENT_LENGTH = 11

const TWO_POW_16 = 2 ** 16
const TWO_POW_31 = 2 ** 31
const TWO_POW_32 = 2 ** 32

const toBuffer = (value) => {
	const buffer = Buffer.alloc(8)
	buffer.writeDoubleBE(value, 0)
	return buffer
}

const fromBuffer = (buffer) => buffer.readDoubleBE(0)

const sign = (value) => {
	const buffer = toBuffer(value)
	return buffer[0] >> 7
}

const exponent = (value) => {
	const buffer = toBuffer(value)
	return buffer.readUInt16BE(0) >> 4 & 0x07ff
}

const mantissa = (value) => {
	const buffer = toBuffer(value)
	const high = buffer.readUInt32BE(0) & 0x0fffff
	const low = buffer.readUInt32BE(4)
	return (high * TWO_POW_32) + low
}

const parse = (value) => ({
	sign: sign(value),
	exponent: exponent(value),
	mantissa: mantissa(value),
})

// TODO: is it faster to just do math?
const _from1 = (s, e, m) => {
	const buffer = Buffer.alloc(8)
	const high = ((s & 0x01) * TWO_POW_31) + (((e & 0x07ff) << 20) | ((m / TWO_POW_32) & 0x0fffff))
	const low = (((m / TWO_POW_16) & 0xffff) * TWO_POW_16) + (m & 0xffff)
	buffer.writeUInt32BE(high, 0)
	buffer.writeUInt32BE(low, 4)
	return fromBuffer(buffer)
}

const _from2 = (s, e, m) => {
	const _s = s ? -1 : 1
	const _e = 2 ** (e - 1023 - 52)
	const _m = (2 ** 52) + m
	return _s * _e * _m
}

const from = ({ sign: s = 0, exponent: e = 0, mantissa: m = 0 }) => _from1(s, e, m)

const nextToward = (value, target) => {
	if (Number.isNaN(value) || Number.isNaN(target)) { return NaN }
	if (value === target) { return value }

	const buffer = toBuffer(value)
	const unsigned = buffer.readBigUInt64BE(0)
	const direction = target > value ? 1n : -1n
	const increment = value > 0 ? direction : -direction
	buffer.writeBigUInt64BE(unsigned + increment, 0)
	return fromBuffer(buffer)
}


module.exports = {
	MANTISSA_LENGTH,
	EXPONENT_LENGTH,
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
