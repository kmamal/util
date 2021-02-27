
const _makeArray = (_x) => {
	let x = _x
	if (typeof x === 'function') {
		x = x()
	}
	if (Array.isArray(x)) {
		return x
	}
	if (!x) {
		return []
	}
	return [ x ]
}

const transit = (stateMachine, stateName, event, ...eventData) => {
	const state = stateMachine[stateName]
	if (!state) {
		const error = new Error("Invalid source state")
		error.stateName = stateName
		throw error
	}

	if (!event) {
		return [ stateName, ..._makeArray(state.onEnter) ]
	}

	let newStateName = null
	const transitionData = []
	for (const entry of state.transitions || []) {
		let result; let triggered

		if (Array.isArray(entry)) {
			const [ trigger, ...rest ] = entry
			triggered = trigger === event
			result = rest
		} else if (typeof entry === 'function') {
			result = entry(event, ...eventData)
			triggered = Boolean(result)
		} else if (typeof entry === 'string') {
			triggered = true
			result = entry
		}

		if (!triggered) {
			continue
		}

		const [ name, ...data ] = _makeArray(result)
		transitionData.push(...data)

		if (name) {
			newStateName = name
			break
		}
	}

	const leaveData = []
	const enterData = []

	if (newStateName && newStateName !== stateName) {
		const newState = stateMachine[newStateName]
		if (!newState) {
			const error = new Error("Invalid target state")
			error.stateName = stateName
			throw error
		}

		leaveData.push(..._makeArray(state.onLeave))
		enterData.push(..._makeArray(newState.onEnter))
	}

	return [ newStateName || stateName, ...leaveData, ...transitionData, ...enterData ]
}

module.exports = { transit }
