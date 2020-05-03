
const debounce = (fn, time, options) => {
	const leading = options && options.leading
	const trailing = !options || options.trailing

	let timeout = null
	let last_args
	let last_result

	const invoke = () => {
		if (!trailing) { return }
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

		setTimeout(invoke, time)
		return last_result
	}

	debounced.cancel = () => {
		if (!timeout) { return }
		cancel()
	}

	debounced.flush = () => {
		if (timeout) {
			cancel()
			invoke()
		}
		return last_result
	}

	return debounced
}

module.exports = { debounce }
