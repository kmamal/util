
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

module.exports = {
	setOwn,
	getOwn,
}
