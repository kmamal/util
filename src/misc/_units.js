
const time = [
	{
		name: {
			singuar: "millisecond",
			plural: "milliseconds",
			short: "ms",
		},
	},
	{
		scale: { factor: 1000 },
		name: {
			singuar: "second",
			plural: "seconds",
			short: "s",
		},
	},
	{
		scale: { factor: 60 },
		name: {
			singuar: "minute",
			plural: "minutes",
			short: "m",
		},
	},
	{
		scale: { factor: 60 },
		name: {
			singuar: "hour",
			plural: "hours",
			short: "h",
		},
	},
	{
		scale: { factor: 24 },
		name: {
			singuar: "day",
			plural: "days",
			short: "D",
		},
	},
	{
		scale: { factor: 7 },
		name: {
			singuar: "week",
			plural: "weeks",
			short: "W",
		},
	},
	{
		scale: { factor: 30, from: -2 },
		name: {
			singuar: "month",
			plural: "months",
			short: "M",
		},
	},
	{
		scale: { factor: 365, from: -3 },
		name: {
			singuar: "year",
			plural: "years",
			short: "Y",
		},
	},
	{
		scale: { factor: 10 },
		name: {
			singuar: "decade",
			plural: "decades",
			short: "DY",
		},
	},
	{
		scale: { factor: 10 },
		name: {
			singuar: "century",
			plural: "centuries",
			short: "C",
		},
	},
]

const units = (units) => (value, unit_name) => {
	let index = -1
	let entry = null
	for (let i = 0; i < units.length; i++) {
		entry = units[i]
		const { name: { singuar, plural, short } } = entry
		if (singuar === unit_name || plural === unit_name || short === unit_name) {
			index = i
			break
		}
	}

	if (index === -1) {
		const error = new Error("unknown unit")
		error.unit = unit
		throw error
	}

	const direction = value < 1 ? -1 : 1
	while (entry) {
		//

		index += direction
		entry = units[index]
	}

	return { value: best_value, unit: best_unit }
}
