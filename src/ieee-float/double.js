const BYTES = 8
const MANTISSA_BITS = 52
const HIDDEN_BIT = 2 ** MANTISSA_BITS
const EXPONENT_BITS = 11
const EXPONENT_MASK = 2 ** EXPONENT_BITS - 1
const EXPONENT_BIAS = 2 ** (EXPONENT_BITS - 1) - 1

const TWO_POW_16 = 2 ** 16
const TWO_POW_31 = 2 ** 31
const TWO_POW_32 = 2 ** 32

const toBuffer = (value) => {
	const buffer = new ArrayBuffer(BYTES)
	const float64 = new Float64Array(buffer)
	float64[0] = value
	buffer.float64 = float64
	return buffer
}

const sign = (value) => {
	const buffer = toBuffer(value)
	const uint8 = new Uint8Array(buffer)
	return uint8[0] >> 7
}

const exponent = (value) => {
	const buffer = toBuffer(value)
	const uint16 = new Uint16Array(buffer)
	return uint16[0] >> 4 & EXPONENT_MASK
}

const mantissa = (value) => {
	const buffer = toBuffer(value)
	const uint32 = new Uint32Array(buffer)
	const high = uint32[0] & 0x0fffff
	const low = uint32[1]
	return (high * TWO_POW_32) + low
}

const parse = (value) => ({
	sign: sign(value),
	exponent: exponent(value),
	mantissa: mantissa(value),
})

// TODO: is it faster to just do math?
const _from1 = (s, e, m) => {
	const high = ((s & 0x01) * TWO_POW_31) + (((e & EXPONENT_MASK) << 20) | ((m / TWO_POW_32) & 0x0fffff))
	const low = (((m / TWO_POW_16) & 0xffff) * TWO_POW_16) + (m & 0xffff)

	const buffer = new ArrayBuffer(BYTES)
	const uint32 = new Uint32Array(buffer)
	uint32[0] = high
	uint32[1] = low
	const float64 = new Float64Array(buffer)
	return float64[0]
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
	const biguint64 = new BigUint64Array(buffer)
	const unsigned = biguint64[0]
	const direction = target > value ? 1n : -1n
	const increment = value > 0 ? direction : -direction
	biguint64[0] = unsigned + increment
	return buffer.float64[0]
}


module.exports = {
	MANTISSA_BITS,
	EXPONENT_BITS,
	sign,
	exponent,
	mantissa,
	parse,
	_from1,
	_from2,
	from,
	nextToward,
}
