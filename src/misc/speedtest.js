const { amrap } = require('./amrap')
const { chronometer } = require('./chronometer')
const { product } = require('../array/combinatorics/product')
const { map } = require('../array/map')
const { every } = require('../array/every')
const { zip: zipObject } = require('../object/zip')


const makeOption = (x) => ({ name: x, value: x })

const run = async function * ({ parameters: _p, pre, post, callback, time }) {
	const parameters = Object.entries(_p)
	const num_parameters = parameters.length
	const parameter_keys = new Array(num_parameters)
	const parameter_options = new Array(num_parameters)

	{
		const labels = {}

		for (let i = 0; i < num_parameters; i++) {
			const [ key, { name, options, values } ] = parameters[i]
			labels[key] = name
			parameter_keys[i] = key
			parameter_options[i] = options ?? map(values, makeOption)
		}

		labels.result = "Result"
		yield { type: 'info', data: { labels } }
	}

	const cases = []
	{
		for (const options of product(parameter_options)) {
			const names = map(options, ({ name }) => name)
			const info = zipObject(parameter_keys, names)

			const filters = map(options, ({ filter }) => filter).filter(Boolean)
			if (!every(filters, (filter) => filter(info))) {
				continue
			}

			const values = map(options, ({ value }) => value)
			const data = zipObject(parameter_keys, values)

			const pre_data = pre ? pre(data) : null
			const elapsed = chronometer(() => callback(data, pre_data))
			post && post(pre_data)

			if (elapsed * 10 <= time) {
				cases.push({ info, data })
			} else {
				yield { type: 'warning', message: 'too slow', data: info }
			}
		}

		const num_cases = cases.length
		const total_time_estimate = time * num_cases
		yield { type: 'info', data: { num_cases, total_time_estimate } }
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
