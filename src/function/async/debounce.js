
const debounce = (fn, time, options) => {
	let leading = false
	let trailing = true
	if (options) {
		if (options.leading !== undefined) { leading = options.leading }
		if (options.trailing !== undefined) { trailing = options.trailing }
	}

	let timeout = null
	let last_args
	let last_result

	const invoke = () => {
		last_result = fn(...last_args)
	}

	const cancel = () => {
		clearTimeout(timeout)
		timeout = null
	}

	const debounced = (...args) => {
		last_args = args

		if (timeout) {
			cancel()
		} else if (leading) {
			invoke()
		}

		timeout = setTimeout(() => {
			timeout = null
			if (!trailing) { return }
			invoke()
		}, time)
		return last_result
	}

	debounced.cancel = () => {
		if (!timeout) { return }
		cancel()
	}

	debounced.flush = () => {
		if (timeout) {
			cancel()
			if (trailing) { invoke() }
		}
		return last_result
	}

	return debounced
}

module.exports = { debounce }
