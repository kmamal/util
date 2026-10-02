
const setOwn = (obj, key, value) => {
	if (key === '__proto__') {
		Object.defineProperty(obj, key, {
			value,
			writable: true,
			enumerable: true,
			configurable: true,
		})
	}
	else {
		obj[key] = value
	}
}

const getOwn = (obj, key) => Object.hasOwn(obj, key) ? obj[key] : undefined

const enumerateOwnKeys = (obj) => {
	const keys = Object.keys(obj)
	const symbols = Object.getOwnPropertySymbols(obj)
	for (let i = 0; i < symbols.length; i++) {
		const symbol = symbols[i]
		if (!Object.prototype.propertyIsEnumerable.call(obj, symbol)) { continue }
		keys.push(symbol)
	}
	return keys
}

module.exports = {
	setOwn,
	getOwn,
	enumerateOwnKeys,
}
