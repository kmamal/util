
const throttle = (fn, time, options) => {
	const leading = options && options.leading
	const trailing = !options || options.trailing
	let timeout = null
	let last_args = null
	let last_result

	const invoke = () => {
		if (last_args && trailing) {
			last_result = fn(...last_args)
		}
		last_args = null
	}

	const throtled = (...args) => {
		last_args = args

		if (!timeout) {
			if (leading) { invoke() }
			setTimeout(invoke, time)
		}

		return last_result
	}

	throtled.cancel = () => {
		if (!timeout) { return }
		clearTimeout(timeout)
		timeout = null
	}

	throtled.flush = () => {
		invoke()
		return last_result
	}

	return throtled
}

module.exports = { throttle }
