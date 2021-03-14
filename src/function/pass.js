const { some } = require('../array/some')

const sym_await = Symbol("await")

const passSync = (_value, funcs) => {
	let value = _value
	for (const func of funcs) {
		value = func(value)
	}
	return value
}

const passAsync = async (_value, funcs) => {
	let value = _value
	for (const func of funcs) {
		if (func === sym_await) {
			value = await value
		} else {
			value = func(value)
		}
	}
	return value
}

const pass = (value, ...funcs) => {
	const is_async = some(funcs, (x) => x === sym_await)
	return is_async
		? passAsync(value, funcs)
		: passSync(value, funcs)
}

pass.await = sym_await

module.exports = { pass }
