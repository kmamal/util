const {
	__timsort,
	timsortWith,
	timsortBy,
	timsortByPure,
	timsort,
} = require('./sorting/timsort')

const __sort = __timsort // NOTE: They are not all that nice

const sortWith = timsortWith
const sortBy = timsortBy
const sortByPure = timsortByPure
const sort = timsort

module.exports = {
	__sort,
	sortWith,
	sortBy,
	sortByPure,
	sort,
}
