const { amrap } = require('./amrap')
const { chronometer } = require('./chronometer')
const { map } = require('../array/map')
const { reduce } = require('../array/reduce')

const iterateParameter = function * (parameter) {
	const { name, key, options, values } = parameter
	const arr = options || map(values, (x) => ({ name: x, value: x }))
	for (const option of arr) {
		yield { name, key, option }
	}
}

const _recurse = function * (parameters, index, options) {
	if (index === parameters.length) {
		yield options
		return
	}

	for (const option of iterateParameter(parameters[index])) {
		options[index] = option
		yield* _recurse(parameters, index + 1, options)
	}
}

const iterateParameters = function * (parameters) {
	const options = new Array(parameters.length)
	yield* _recurse(parameters, 0, options)
}

const run = async function * ({ parameters: _p, pre, post, callback, time }) {
	const parameters = map(Object.entries(_p), ([ key, value ]) => ({ ...value, key }))
	{
		const labels = reduce(parameters, (acc, { name, key }) => ({ ...acc, [key]: name }), {})
		labels.result = "Result"
		yield { type: 'info', data: { labels } }
	}

	const cases = []
	{
		foreach_case:
		for (const options of iterateParameters(parameters)) {
			const info = {}
			const data = {}
			const filters = []
			for (const { key, option: { name, value, filter } } of options) {
				info[key] = name
				data[key] = value
				if (filter) { filters.push(filter) }
			}

			for (const filter of filters) {
				if (!filter(info)) { continue foreach_case }
			}

			const pre_data = pre ? pre(data) : null
			const elapsed = chronometer(() => callback(data, pre_data))
			post && post(pre_data)

			if (elapsed * 10 <= time) {
				cases.push({ info, data })
			} else {
				yield { type: 'warning', message: 'too slow', data: info }
			}
		}

		const numCases = cases.length
		const totalTimeEstimate = time * numCases
		yield { type: 'info', data: { numCases, totalTimeEstimate } }
	}

	for (const c of cases) {
		const { info, data } = c

		const pre_data = pre ? pre(data) : null

		// Warmup
		global.gc(true)
		for (let i = 0; i < 10; i++) { callback(data, pre_data) }

		// Measure
		let count = 0
		await amrap((reps) => {
			count += reps
			for (let i = 0; i < reps; i++) {
				callback(data, pre_data)
			}
		}, time)

		post && post(pre_data)

		yield { type: 'result', data: { ...info, result: count } }
	}
}

module.exports = { run }
