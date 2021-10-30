const { pass } = require('../function/pass')
const { pipe } = require('../function/pipe')

const __fp = (func) => (...args) => (x) => func(x, ...args)
const _fp = (func) => {
	if (func.length === 1) { return func }
	const fp = __fp(func)
	if (func.$$$) { fp.$$$ = __fp(func.$$$) }
	return fp
}

const { chunk } = require('../array/chunk')
const { clone } = require('../array/clone')
const { compactMap } = require('../array/compact-map')
const { compact } = require('../array/compact')
const { concat } = require('../array/concat')
const { count, countBy } = require('../array/count')
const { cycle } = require('../array/cycle')
const { every } = require('../array/every')
const { fill } = require('../array/fill')
const { filter } = require('../array/filter')
const {
	find,
	findIndex,
	findIndexRight,
	findRight,
} = require('../array/find')
const { first } = require('../array/first')
const { flatMap } = require('../array/flat-map')
const { flat } = require('../array/flat')
const { forEach } = require('../array/for-each')
const { groupBy } = require('../array/group-by')
const {
	includes,
	includesBy,
	includesByPure,
	includesByPureSorted,
	includesBySorted,
	includesSorted,
	includesWith,
	includesWithSorted,
} = require('../array/includes')
const {
	indexOf,
	indexOfBy,
	indexOfByPure,
	indexOfByPureRight,
	indexOfByPureSorted,
	indexOfByPureSortedRight,
	indexOfByRight,
	indexOfBySorted,
	indexOfBySortedRight,
	indexOfRight,
	indexOfSorted,
	indexOfSortedRight,
	indexOfWith,
	indexOfWithRight,
	indexOfWithSorted,
	indexOfWithSortedRight,
} = require('../array/index-of')
const { interpose } = require('../array/interpose')
const {
	isSorted,
	isSortedBy,
	isSortedByPure,
	isSortedWith,
} = require('../array/is-sorted')
const { last } = require('../array/last')
const { map } = require('../array/map')
const {
	max,
	maxBy,
	maxIndex,
	maxIndexBy,
} = require('../array/max')
const {
	minIndexBy,
	minIndex,
	minBy,
	min,
} = require('../array/min')
const { nth } = require('../array/nth')
const {
	prefixSums,
	prefixSumsBy,
} = require('../array/prefix-sums')
const {
	reduce,
	reduceRight,
} = require('../array/reduce')
const { repeat: repeatArray } = require('../array/repeat')
const { reverse } = require('../array/reverse')
const { rotate } = require('../array/rotate')
const {
	scan,
	scanRight,
} = require('../array/scan')
const { slice } = require('../array/slice')
const { some } = require('../array/some')
const {
	sort,
	sortBy,
	sortByPure,
	sortWith,
} = require('../array/sort')
const { split: splitArray } = require('../array/split')
const {
	sum,
	sumBy,
} = require('../array/sum')
const {
	uniq,
	uniqBy,
	uniqByPure,
	uniqByPureSorted,
	uniqBySorted,
	uniqSorted,
	uniqWith,
	uniqWithSorted,
} = require('../array/uniq')
const { zip } = require('../array/zip')

const {
	get,
	set,
} = require('../object/accessors')
const { defaults } = require('../object/defaults')
const { extend } = require('../object/extend')
const { fromEntries } = require('../object/from-entries')
const {
	isEqual,
	isEqualWith,
} = require('../object/is-equal')
const { keys } = require('../object/keys')
const { mapValues } = require('../object/map-values')
const {
	matches,
	matchesWith,
} = require('../object/matches')
const { omit } = require('../object/omit')
const { pick } = require('../object/pick')
const { toEntries } = require('../object/to-entries')
const { values } = require('../object/values')
const { zip: zipObject } = require('../object/zip')

const { after } = require('../function/async/after')
const { before } = require('../function/async/before')
const { debounce } = require('../function/async/debounce')
const { delay } = require('../function/async/delay')
const { once } = require('../function/async/once')
const { throttle } = require('../function/async/throttle')

const { clamp } = require('../number/clamp')
const { toExponential } = require('../number/stringify/to-exponential')
const { toFixed } = require('../number/stringify/to-fixed')
const { toLocaleString } = require('../number/stringify/to-locale-string')
const { toPrecision } = require('../number/stringify/to-precision')

const {
	add, div, neg, mod, mul, pow, sub,
	bitAnd, bitNot, bitOr, bitXor, shiftL, shiftR, shiftZ,
	eq, gt, gte, lt, lte, neq,
	and, not, or,
} = require('../operators')

const { choose } = require('../random/choose')
const { chooseN } = require('../random/choose-n')
const { shuffle } = require('../random/shuffle')

const {
	charAt,
	charCodeAt,
	charPointAt,
} = require('../string/char-at')

const { endsWith } = require('../string/ends-with')
const { join } = require('../string/join')
const { localeCompare } = require('../string/locale-compare')
const {
	match,
	matchAll,
	search,
} = require('../string/match')
const { normalize } = require('../string/normalize')
const {
	padStart,
	padEnd,
} = require('../string/pad')
const { repeat } = require('../string/repeat')
const { replace } = require('../string/replace')
const { split } = require('../string/split')
const { startsWith } = require('../string/starts-with')
const { substring } = require('../string/substring')
const {
	lowerCase,
	isLowerCase,
} = require('../string/case/lower')
const {
	upperCase,
	isUpperCase,
} = require('../string/case/upper')
const {
	localeLowerCase,
	isLocaleLowerCase,
} = require('../string/case/locale-lower')
const {
	localeUpperCase,
	isLocaleUpperCase,
} = require('../string/case/locale-upper')
const {
	camelCase,
	isCamelCase,
} = require('../string/case/camel')
const {
	pascalCase,
	isPascalCase,
} = require('../string/case/pascal')
const {
	snakeCase,
	isSnakeCase,
} = require('../string/case/snake')
const {
	kebabCase,
	isKebabCase,
} = require('../string/case/kebab')

const {
	trim,
	trimEnd,
	trimStart,
} = require('../string/trim')

const {
	toParts,
	fromParts,
	fromPartsUntil,
} = require('../date/parts')

const {
	getWeek,
} = require('../date/week')


const { fromFactory: arrayFromFactory } = require('../array/from-factory')
const { fromHandlers: arrayFromHandlers } = require('../array/from-handlers')

const { withHooks: mapWithHooks } = require('../map/with-hooks')

const { combine } = require('../array/combine')
const {
	comm,
	commBy,
	commByPure,
	commWith,
} = require('../array/comm')
const { copy } = require('../array/copy')
const {
	difference,
	differenceBy,
	differenceByPure,
	differenceByPureSorted,
	differenceBySorted,
	differenceSorted,
	differenceWith,
	differenceWithSorted,
} = require('../array/difference')
const {
	intersection,
	intersectionBy,
	intersectionByPure,
	intersectionByPureSorted,
	intersectionBySorted,
	intersectionSorted,
	intersectionWith,
	intersectionWithSorted,
} = require('../array/intersection')
const { interweave } = require('../array/interweave')
const { join: joinArray } = require('../array/join')
const {
	merge,
	mergeBy,
	mergeByPure,
	mergeWith,
} = require('../array/merge')
const swap = require('../array/swap')
const {
	xor,
	xorBy,
	xorByPure,
	xorByPureSorted,
	xorBySorted,
	xorSorted,
	xorWith,
	xorWithSorted,
} = require('../array/xor')

const { compare } = require('../function/compare')
const { identity } = require('../function/identity')
const { memoize } = require('../function/memoize')
const { middleware } = require('../function/middleware')
const { noop } = require('../function/noop')

const { interpolate } = require('../number/interpolate')

const { sleep } = require('../promise/sleep')
const { timeout } = require('../promise/timeout')

const { rand } = require('../random/rand')
const { randFloat } = require('../random/rand-float')
const { randInt } = require('../random/rand-int')
const { random } = require('../random/random')

const { range } = require('../range/range')
const { xrange } = require('../range/xrange')

const { difference: setsDifference } = require('../set/difference')
const { intersection: setsIntersection } = require('../set/intersection')
const { union: setsUnion } = require('../set/union')
const { xor: setsXor } = require('../set/xor')

module.exports = {
	pass,
	pipe,
	await: pass.await,

	tap: (fn) => (x) => {
		fn(x)
		return x
	},

	chunk: _fp(chunk),
	clone: _fp(clone),
	compact: _fp(compact),
	compactMap: _fp(compactMap),
	concat: _fp(concat),
	count: _fp(count),
	countBy: _fp(countBy),
	cycle: _fp(cycle),
	every: _fp(every),
	fill: _fp(fill),
	filter: _fp(filter),
	find: _fp(find),
	findIndex: _fp(findIndex),
	findIndexRight: _fp(findIndexRight),
	findRight: _fp(findRight),
	first: _fp(first),
	flat: _fp(flat),
	flatMap: _fp(flatMap),
	forEach: _fp(forEach),
	groupBy: _fp(groupBy),
	includes: _fp(includes),
	includesBy: _fp(includesBy),
	includesByPure: _fp(includesByPure),
	includesByPureSorted: _fp(includesByPureSorted),
	includesBySorted: _fp(includesBySorted),
	includesSorted: _fp(includesSorted),
	includesWith: _fp(includesWith),
	includesWithSorted: _fp(includesWithSorted),
	indexOf: _fp(indexOf),
	indexOfBy: _fp(indexOfBy),
	indexOfByPure: _fp(indexOfByPure),
	indexOfByPureRight: _fp(indexOfByPureRight),
	indexOfByPureSorted: _fp(indexOfByPureSorted),
	indexOfByPureSortedRight: _fp(indexOfByPureSortedRight),
	indexOfByRight: _fp(indexOfByRight),
	indexOfBySorted: _fp(indexOfBySorted),
	indexOfBySortedRight: _fp(indexOfBySortedRight),
	indexOfRight: _fp(indexOfRight),
	indexOfSorted: _fp(indexOfSorted),
	indexOfSortedRight: _fp(indexOfSortedRight),
	indexOfWith: _fp(indexOfWith),
	indexOfWithRight: _fp(indexOfWithRight),
	indexOfWithSorted: _fp(indexOfWithSorted),
	indexOfWithSortedRight: _fp(indexOfWithSortedRight),
	interpose: _fp(interpose),
	isSorted: _fp(isSorted),
	isSortedBy: _fp(isSortedBy),
	isSortedByPure: _fp(isSortedByPure),
	isSortedWith: _fp(isSortedWith),
	last: _fp(last),
	map: _fp(map),
	max: _fp(max),
	maxBy: _fp(maxBy),
	maxIndex: _fp(maxIndex),
	maxIndexBy: _fp(maxIndexBy),
	min: _fp(min),
	minBy: _fp(minBy),
	minIndex: _fp(minIndex),
	minIndexBy: _fp(minIndexBy),
	nth: _fp(nth),
	prefixSums: _fp(prefixSums),
	prefixSumsBy: _fp(prefixSumsBy),
	reduce: _fp(reduce),
	reduceRight: _fp(reduceRight),
	repeatArray: _fp(repeatArray),
	reverse: _fp(reverse),
	rotate: _fp(rotate),
	scan: _fp(scan),
	scanRight: _fp(scanRight),
	slice: _fp(slice),
	some: _fp(some),
	sort: _fp(sort),
	sortBy: _fp(sortBy),
	sortByPure: _fp(sortByPure),
	sortWith: _fp(sortWith),
	splitArray: _fp(splitArray),
	sum: _fp(sum),
	sumBy: _fp(sumBy),
	uniq: _fp(uniq),
	uniqBy: _fp(uniqBy),
	uniqByPure: _fp(uniqByPure),
	uniqByPureSorted: _fp(uniqByPureSorted),
	uniqBySorted: _fp(uniqBySorted),
	uniqSorted: _fp(uniqSorted),
	uniqWith: _fp(uniqWith),
	uniqWithSorted: _fp(uniqWithSorted),
	zip: _fp(zip),

	get: _fp(get),
	set: _fp(set),
	defaults: _fp(defaults),
	extend: _fp(extend),
	fromEntries: _fp(fromEntries),
	isEqual: _fp(isEqual),
	isEqualWith: _fp(isEqualWith),
	keys: _fp(keys),
	mapValues: _fp(mapValues),
	matches: _fp(matches),
	matchesWith: _fp(matchesWith),
	omit: _fp(omit),
	pick: _fp(pick),
	toEntries: _fp(toEntries),
	values: _fp(values),

	after,
	before,
	debounce,
	delay,
	once,
	throttle,

	clamp: _fp(clamp),
	toExponential: _fp(toExponential),
	toFixed: _fp(toFixed),
	toLocaleString: _fp(toLocaleString),
	toPrecision: _fp(toPrecision),

	add: _fp(add),
	div: _fp(div),
	neg: _fp(neg),
	mod: _fp(mod),
	mul: _fp(mul),
	pow: _fp(pow),
	sub: _fp(sub),

	bitAnd: _fp(bitAnd),
	bitNot: _fp(bitNot),
	bitOr: _fp(bitOr),
	bitXor: _fp(bitXor),
	shiftL: _fp(shiftL),
	shiftR: _fp(shiftR),
	shiftZ: _fp(shiftZ),

	eq: _fp(eq),
	gt: _fp(gt),
	gte: _fp(gte),
	lt: _fp(lt),
	lte: _fp(lte),
	neq: _fp(neq),

	and: _fp(and),
	not: _fp(not),
	or: _fp(or),

	choose: _fp(choose),
	chooseN: _fp(chooseN),
	shuffle: _fp(shuffle),

	rand: (...args) => () => rand(...args),
	randFloat: (...args) => () => randFloat(...args),
	randInt: (...args) => () => randInt(...args),
	random: (...args) => () => random(...args),

	charAt: _fp(charAt),
	charCodeAt: _fp(charCodeAt),
	charPointAt: _fp(charPointAt),
	endsWith: _fp(endsWith),
	join: _fp(join),
	localeCompare: _fp(localeCompare),
	match: _fp(match),
	matchAll: _fp(matchAll),
	search: _fp(search),
	normalize: _fp(normalize),
	padStart: _fp(padStart),
	padEnd: _fp(padEnd),
	repeat: _fp(repeat),
	replace: _fp(replace),
	split: _fp(split),
	startsWith: _fp(startsWith),
	substring: _fp(substring),
	lowerCase: _fp(lowerCase),
	isLowerCase: _fp(isLowerCase),
	upperCase: _fp(upperCase),
	isUpperCase: _fp(isUpperCase),
	localeLowerCase: _fp(localeLowerCase),
	isLocaleLowerCase: _fp(isLocaleLowerCase),
	localeUpperCase: _fp(localeUpperCase),
	isLocaleUpperCase: _fp(isLocaleUpperCase),
	camelCase: _fp(camelCase),
	isCamelCase: _fp(isCamelCase),
	pascalCase: _fp(pascalCase),
	isPascalCase: _fp(isPascalCase),
	snakeCase: _fp(snakeCase),
	isSnakeCase: _fp(isSnakeCase),
	kebabCase: _fp(kebabCase),
	isKebabCase: _fp(isKebabCase),
	trim: _fp(trim),
	trimEnd: _fp(trimEnd),
	trimStart: _fp(trimStart),

	toParts: _fp(toParts),
	fromParts: _fp(fromParts),
	fromPartsUntil: _fp(fromPartsUntil),
	getWeek: _fp(getWeek),

	util: {
		arrayFromFactory,
		arrayFromHandlers,

		mapWithHooks,

		combine,
		comm,
		commBy,
		commByPure,
		commWith,
		copy,
		difference,
		differenceBy,
		differenceByPure,
		differenceByPureSorted,
		differenceBySorted,
		differenceSorted,
		differenceWith,
		differenceWithSorted,
		intersection,
		intersectionBy,
		intersectionByPure,
		intersectionByPureSorted,
		intersectionBySorted,
		intersectionSorted,
		intersectionWith,
		intersectionWithSorted,
		interweave,
		joinArray,
		merge,
		mergeBy,
		mergeByPure,
		mergeWith,
		swap,
		xor,
		xorBy,
		xorByPure,
		xorByPureSorted,
		xorBySorted,
		xorSorted,
		xorWith,
		xorWithSorted,

		zipObject,

		compare,
		identity,
		memoize,
		middleware,
		noop,

		interpolate,

		sleep,
		timeout,

		rand,
		randFloat,
		randInt,
		random,

		range,
		xrange,

		times: (n, fn) => {
			const res = new Array(n)
			for (let i = 0; i < n; i++) {
				res[i] = fn(i)
			}
			return res
		},
	},

	sets: {
		difference: setsDifference,
		intersection: setsIntersection,
		union: setsUnion,
		xor: setsXor,
	},
}
