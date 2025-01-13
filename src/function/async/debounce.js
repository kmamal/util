
const debounce = (fn, time, options) => {
	let leading = false
	let trailing = true
	if (options) {
		if (options.leading !== undefined) { leading = options.leading }
		if (options.trailing !== undefined) { trailing = options.trailing }
	}

	let timeout = null
	let lastArgs
	let lastResult

	const invoke = () => {
		lastResult = fn(...lastArgs)
	}

	const onTimeout = () => {
		timeout = null
		if (!trailing) { return }
		invoke()
	}

	const cancel = () => {
		clearTimeout(timeout)
		timeout = null
	}

	const debounced = (...args) => {
		lastArgs = args

		if (timeout !== null) {
			cancel()
		} else if (leading) {
			invoke()
		}

		timeout = setTimeout(onTimeout, time)
		return lastResult
	}

	debounced.cancel = () => {
		if (timeout === null) { return }
		cancel()
	}

	debounced.flush = () => {
		if (timeout !== null) {
			cancel()
			if (trailing) { invoke() }
		}
		return lastResult
	}

	return debounced
}

module.exports = { debounce }
