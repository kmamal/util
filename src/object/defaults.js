const { extend } = require('./extend')

const defaults$$$ = (obj, def) => {
	for (const key of Object.keys(def)) {
		if (obj[key] !== undefined) { continue }
		obj[key] = def[key]
	}
	return obj
}

const defaults = (obj, def) => extend(def, obj)

defaults.$$$ = defaults$$$

module.exports = { defaults }
