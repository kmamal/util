const BYTES = 4
const MANTISSA_BITS = 23
const MANTISSA_MASK = 2 ** MANTISSA_BITS - 1
const HIDDEN_BIT = 2 ** MANTISSA_BITS
const EXPONENT_BITS = 8
const EXPONENT_MASK = 2 ** EXPONENT_BITS - 1
const EXPONENT_BIAS = 2 ** (EXPONENT_BITS - 1) - 1

const toBuffer = (value) => {
	const buffer = new ArrayBuffer(BYTES)
	const float32 = new Float32Array(buffer)
	float32[0] = value
	buffer.float32 = float32
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
	return uint16[0] >> 7 & EXPONENT_MASK
}

const mantissa = (value) => {
	const buffer = toBuffer(value)
	const uint32 = new Uint32Array(buffer)
	return uint32[0] & MANTISSA_MASK
}

const parse = (value) => ({
	sign: sign(value),
	exponent: exponent(value),
	mantissa: mantissa(value),
})

// TODO: is it faster to just do math?
const _from1 = (s, e, m) => {
	const value = 0
		 | ((s & 0x01) << 32 - 1)
		 | ((e & EXPONENT_MASK) << 32 - EXPONENT_BITS)
		 | ((m & MANTISSA_MASK))

	const buffer = new ArrayBuffer(BYTES)
	const uint32 = new Uint32Array(buffer)
	uint32[0] = value
	const float32 = new Float32Array(buffer)
	return float32[0]
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
	const uint32 = new Uint32Array(buffer)
	const unsigned = uint32(0)
	const direction = target > value ? 1 : -1
	const increment = value > 0 ? direction : -direction
	uint32[0] = unsigned + increment
	return buffer.float32[0]
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
