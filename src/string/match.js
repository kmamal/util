
const search = (str, regexp) => str.search(regexp)
const match = (str, regexp) => str.match(regexp)
const matchAll = (str, regexp) => str.matchAll(regexp)

module.exports = {
	search,
	match,
	matchAll,
}
