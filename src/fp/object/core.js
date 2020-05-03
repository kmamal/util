
const assign = (values) => (obj) => ({ ...obj, ...values })
const entries = Object.entries

module.exports = {
	assign,
	entries,
}
