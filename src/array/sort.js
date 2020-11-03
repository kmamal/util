const {
	timsortWith,
	timsortBy,
	timsortByPure,
	timsort,
} = require('./sorting/timsort')

const sortWith = timsortWith
const sortBy = timsortBy
const sortByPure = timsortByPure
const sort = timsort

module.exports = {
	sortWith,
	sortBy,
	sortByPure,
	sort,
}
