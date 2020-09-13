const { timsort, timsortBy, timsortWith } = require('./sorting/timsort')

const sortWith = timsortWith
const sortBy = timsortBy
const sort = timsort

module.exports = {
	sortWith,
	sortBy,
	sort,
}
