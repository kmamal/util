
const charAt = (i) => (str) => str.charAt(i)
const charCodeAt = (i) => (str) => str.charCodeAt(i)
const charPointAt = (i) => (str) => str.charPointAt(i)
const endsWith = (suffix, length) => (str) => str.endsWith(suffix, length)
const localeCompare = (other, ocales, options) => (str) => str.localeCompare(other, ocales, options)
const match = (regexp) => (str) => str.match(regexp)
const matchAll = (regexp) => (str) => str.matchAll(regexp)
const normalize = (form) => (str) => str.normalize(form)
const padEnd = (length, pad) => (str) => str.padEnd(length, pad)
const padStart = (length, pad) => (str) => str.padStart(length, pad)
const replace = (pattern, replacer) => (str) => str.replace(pattern, replacer)
const search = (regexp) => (str) => str.search(regexp)
const split = (sep, limit) => (str) => str.split(sep, limit)
const startsWith = (prefix, index) => (str) => str.startsWith(prefix, index)
const substring = (start, end) => (str) => str.substring(start, end)
const toLocaleLowerCase = (locale) => (str) => str.toLocaleLowerCase(locale)
const toLocaleUpperCase = (locale) => (str) => str.toLocaleUpperCase(locale)
const toLowerCase = (str) => str.toLowerCase()
const toUpperCase = (str) => str.toUpperCase()
const trim = (str) => str.trim()
const trimEnd = (str) => str.trimEnd()
const trimStart = (str) => str.trimStart()

module.exports = {
	charAt,
	charCodeAt,
	charPointAt,
	endsWith,
	// includes,
	// indexOf,
	// lastIndexOf,
	localeCompare,
	match,
	matchAll,
	normalize,
	padEnd,
	padStart,
	// repeat,
	replace,
	search,
	// slice
	split,
	startsWith,
	substring,
	toLocaleLowerCase,
	toLocaleUpperCase,
	toLowerCase,
	toUpperCase,
	trim,
	trimEnd,
	trimStart,
}
