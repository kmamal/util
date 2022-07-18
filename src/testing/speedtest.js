const { amrap } = require('../function/async/amrap')
const { chronometer } = require('../function/async/time')
const { product } = require('../array/combinatorics/product')
const { map } = require('../array/map')
const { every } = require('../array/every')
const { zip: zipObject } = require('../object/zip')


const makeOption = (x) => ({ name: x, value: x })

const run = async function * ({ parameters: _p, pre, post, callback, time }) {
	const parameters = Object.entries(_p)
	const numParameters = parameters.length
	const parameterKeys = new Array(numParameters)
	const parameterOptions = new Array(numParameters)

	{
		const labels = {}

		for (let i = 0; i < numParameters; i++) {
			const [ key, { name, options, values } ] = parameters[i]
			labels[key] = name
			parameterKeys[i] = key
			parameterOptions[i] = options ?? map(values, makeOption)
		}

		labels.result = "Result"
		yield { type: 'info', data: { labels } }
	}

	const cases = []
	{
		for (const options of product(parameterOptions)) {
			const names = map(options, ({ name }) => name)
			const info = zipObject(parameterKeys, names)

			const filters = map(options, ({ filter }) => filter).filter(Boolean)
			if (!every(filters, (filter) => filter(info))) {
				continue
			}

			const values = map(options, ({ value }) => value)
			const data = zipObject(parameterKeys, values)

			const preData = pre ? pre(data) : null
			const elapsed = chronometer(() => callback(data, preData))
			post && post(preData)

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

		const preData = pre ? pre(data) : null

		// Warmup
		global.gc(true)
		for (let i = 0; i < 10; i++) { callback(data, preData) }

		// Measure
		let count = 0
		await amrap((reps) => {
			count += reps
			for (let i = 0; i < reps; i++) {
				callback(data, preData)
			}
		}, time)

		post && post(preData)

		yield { type: 'result', data: { ...info, result: count } }
	}
}

module.exports = { run }
