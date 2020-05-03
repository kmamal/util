
const _await = Symbol('await')

const pipe = (...args) => {
	let value = args[0]
	for (let i = 1; i < args.length; i++) {
		const arg = args[i]
		if (arg === _await) { return value.then((x) => pipe(x, ...args.slice(i + 1))) }
		value = arg(value)
	}
	return value
}

const pass = (x, ...args) => {
	const pipeline = pipe(...args)
	return pipeline(x)
}

module.exports = {
	await: _await,
	pipe,
	pass,
}
