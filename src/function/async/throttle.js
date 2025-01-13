
const throttle = (fn, time, options) => {
	const leading = options && options.leading
	const trailing = !options || options.trailing
	let timeout = null
	let lastArgs = null
	let lastResult

	const invoke = () => {
		if (lastArgs === null) { return }
		lastResult = fn(...lastArgs)
		if (timeout === null) { lastArgs = null }
	}

	const onTimeout = () => {
		timeout = null
		if (trailing) { invoke() }
	}

	const throtled = (...args) => {
		lastArgs = args

		if (timeout !== null) { return lastResult }
		timeout = setTimeout(onTimeout, time)

		if (leading) { invoke() }

		return lastResult
	}

	throtled.cancel = () => {
		if (timeout === null) { return }
		clearTimeout(timeout)
		timeout = null
	}

	throtled.flush = () => {
		invoke()
		return lastResult
	}

	return throtled
}

module.exports = { throttle }
