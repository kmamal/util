const _ = require('./index.js')

const __fp = (func) => (...args) => (x) => func(x, ...args)
const _fp = (func) => {
	if (func.length === 1) { return func }
	const fp = __fp(func)
	if (func.$$$) { fp.$$$ = __fp(func.$$$) }
	return fp
}


module.exports = {
	_,
	pass: _.pass,
	pipe: _.pipe,
	await: _.pass.await,

	tap: (fn) => (x) => {
		fn(x)
		return x
	},

	times: (n, fn) => {
		for (let i = 0; i < n; i++) {
			fn(i)
		}
	},

	chunk: _fp(_.chunk),
	clone: _fp(_.clone),
	compact: _fp(_.compact),
	compactMap: _fp(_.compactMap),
	concat: _fp(_.concat),
	count: _fp(_.count),
	countBy: _fp(_.countBy),
	cycle: _fp(_.cycle),
	every: _fp(_.every),
	fill: _fp(_.fill),
	fillWith: _fp(_.fillWith),
	filter: _fp(_.filter),
	find: _fp(_.find),
	findIndex: _fp(_.findIndex),
	findIndexRight: _fp(_.findIndexRight),
	findRight: _fp(_.findRight),
	first: _fp(_.first),
	flat: _fp(_.flat),
	flatMap: _fp(_.flatMap),
	forEach: _fp(_.forEach),
	groupBy: _fp(_.groupBy),
	includes: _fp(_.includes),
	includesBy: _fp(_.includesBy),
	includesByPure: _fp(_.includesByPure),
	includesByPureSorted: _fp(_.includesByPureSorted),
	includesBySorted: _fp(_.includesBySorted),
	includesSorted: _fp(_.includesSorted),
	includesWith: _fp(_.includesWith),
	includesWithSorted: _fp(_.includesWithSorted),
	indexOf: _fp(_.indexOf),
	indexOfBy: _fp(_.indexOfBy),
	indexOfByPure: _fp(_.indexOfByPure),
	indexOfByPureRight: _fp(_.indexOfByPureRight),
	indexOfByPureSorted: _fp(_.indexOfByPureSorted),
	indexOfByPureSortedRight: _fp(_.indexOfByPureSortedRight),
	indexOfByRight: _fp(_.indexOfByRight),
	indexOfBySorted: _fp(_.indexOfBySorted),
	indexOfBySortedRight: _fp(_.indexOfBySortedRight),
	indexOfRight: _fp(_.indexOfRight),
	indexOfSorted: _fp(_.indexOfSorted),
	indexOfSortedRight: _fp(_.indexOfSortedRight),
	indexOfWith: _fp(_.indexOfWith),
	indexOfWithRight: _fp(_.indexOfWithRight),
	indexOfWithSorted: _fp(_.indexOfWithSorted),
	indexOfWithSortedRight: _fp(_.indexOfWithSortedRight),
	interpose: _fp(_.interpose),
	intersection: _fp(_.intersection),
	intersectionBy: _fp(_.intersectionBy),
	intersectionByPure: _fp(_.intersectionByPure),
	intersectionByPureSorted: _fp(_.intersectionByPureSorted),
	intersectionBySorted: _fp(_.intersectionBySorted),
	intersectionSorted: _fp(_.intersectionSorted),
	intersectionWith: _fp(_.intersectionWith),
	intersectionWithSorted: _fp(_.intersectionWithSorted),
	isSorted: _fp(_.isSorted),
	isSortedBy: _fp(_.isSortedBy),
	isSortedByPure: _fp(_.isSortedByPure),
	isSortedWith: _fp(_.isSortedWith),
	last: _fp(_.last),
	map: _fp(_.map),
	max: _fp(_.max),
	maxBy: _fp(_.maxBy),
	maxIndex: _fp(_.maxIndex),
	maxIndexBy: _fp(_.maxIndexBy),
	min: _fp(_.min),
	minBy: _fp(_.minBy),
	minIndex: _fp(_.minIndex),
	minIndexBy: _fp(_.minIndexBy),
	nth: _fp(_.nth),
	prefixSums: _fp(_.prefixSums),
	prefixSumsBy: _fp(_.prefixSumsBy),
	reduce: _fp(_.reduce),
	reduceRight: _fp(_.reduceRight),
	reverse: _fp(_.reverse),
	rotate: _fp(_.rotate),
	scan: _fp(_.scan),
	scanRight: _fp(_.scanRight),
	slice: _fp(_.slice),
	some: _fp(_.some),
	sort: _fp(_.sort),
	sortBy: _fp(_.sortBy),
	sortByPure: _fp(_.sortByPure),
	sortWith: _fp(_.sortWith),
	sum: _fp(_.sum),
	sumBy: _fp(_.sumBy),
	uniq: _fp(_.uniq),
	uniqBy: _fp(_.uniqBy),
	uniqByPure: _fp(_.uniqByPure),
	uniqByPureSorted: _fp(_.uniqByPureSorted),
	uniqBySorted: _fp(_.uniqBySorted),
	uniqSorted: _fp(_.uniqSorted),
	uniqWith: _fp(_.uniqWith),
	uniqWithSorted: _fp(_.uniqWithSorted),
	unweave: _fp(_.unweave),
	weave: _fp(_.weave),
	weaveTwo: _fp(_.weaveTwo),
	xor: _fp(_.xor),
	xorBy: _fp(_.xorBy),
	xorByPure: _fp(_.xorByPure),
	xorByPureSorted: _fp(_.xorByPureSorted),
	xorBySorted: _fp(_.xorBySorted),
	xorSorted: _fp(_.xorSorted),
	xorWith: _fp(_.xorWith),
	xorWithSorted: _fp(_.xorWithSorted),
	zip: _fp(_.zip),
	zipWith: _fp(_.zipWith),

	array: {
		join: _fp(_.array.join),
		split: _fp(_.array.split),
		splitBy: _fp(_.array.splitBy),
		splitWith: _fp(_.array.splitWith),
		repeat: _fp(_.array.repeat),
	},

	after: _fp(_.after),
	amrap: _fp(_.amrap),
	before: _fp(_.before),
	debounce: _fp(_.debounce),
	delay: _fp(_.delay),
	once: _fp(_.once),
	time: _fp(_.time),
	throttle: _fp(_.throttle),

	nullary: _fp(_.nullary),
	unary: _fp(_.unary),
	binary: _fp(_.binary),
	ternary: _fp(_.ternary),
	nAry: _fp(_.nAry),

	memoize: _fp(_.memoize),
	makeMiddleware: _fp(_.makeMiddleware),

	addDefault: _fp(_.addDefault),

	get: _fp(_.get),
	_get: _fp(_._get),
	set: _fp(_.set),
	_set: _fp(_._set),
	defaults: _fp(_.defaults),
	extend: _fp(_.extend),
	fromEntries: _fp(_.fromEntries),
	isEqual: _fp(_.isEqual),
	isEqualWith: _fp(_.isEqualWith),
	keys: _fp(_.keys),
	mapEntries: _fp(_.mapEntries),
	mapKeys: _fp(_.mapKeys),
	mapValues: _fp(_.mapValues),
	matches: _fp(_.matches),
	matchesWith: _fp(_.matchesWith),
	omit: _fp(_.omit),
	pick: _fp(_.pick),
	toEntries: _fp(_.toEntries),
	values: _fp(_.values),

	object: {
		clone: _fp(_.object.clone),
		merge: _fp(_.object.merge),
	},

	clamp: _fp(_.clamp),
	toExponential: _fp(_.toExponential),
	toFixed: _fp(_.toFixed),
	toLocaleString: _fp(_.toLocaleString),
	toPrecision: _fp(_.toPrecision),

	ceilTo: _fp(_.ceilTo),
	floorTo: _fp(_.floorTo),
	roundTo: _fp(_.roundTo),

	modular: {
		add: _fp(_.modular.add),
		sub: _fp(_.modular.sub),
		inc: _fp(_.modular.inc),
		dec: _fp(_.modular.dec),
	},

	add: _fp(_.add),
	div: _fp(_.div),
	neg: _fp(_.neg),
	mod: _fp(_.mod),
	mul: _fp(_.mul),
	pow: _fp(_.pow),
	sub: _fp(_.sub),

	bitAnd: _fp(_.bitAnd),
	bitNot: _fp(_.bitNot),
	bitOr: _fp(_.bitOr),
	bitXor: _fp(_.bitXor),
	shiftL: _fp(_.shiftL),
	shiftR: _fp(_.shiftR),
	shiftZ: _fp(_.shiftZ),

	eq: _fp(_.eq),
	gt: _fp(_.gt),
	gte: _fp(_.gte),
	lt: _fp(_.lt),
	lte: _fp(_.lte),
	neq: _fp(_.neq),

	and: _fp(_.and),
	nil: _fp(_.nil),
	not: _fp(_.not),
	or: _fp(_.or),

	choose: _.unary(_.choose),
	chooseN: _fp(_.chooseN),
	shuffle: _.unary(_.shuffle),

	rand: (...args) => () => _.rand(...args),
	randFloat: (...args) => () => _.randFloat(...args),
	randInt: (...args) => () => _.randInt(...args),
	random: (...args) => () => _.random(...args),

	charAt: _fp(_.charAt),
	charCodeAt: _fp(_.charCodeAt),
	charPointAt: _fp(_.charPointAt),
	endsWith: _fp(_.endsWith),
	join: _fp(_.join),
	localeCompare: _fp(_.localeCompare),
	match: _fp(_.match),
	matchAll: _fp(_.matchAll),
	search: _fp(_.search),
	normalize: _fp(_.normalize),
	padStart: _fp(_.padStart),
	padEnd: _fp(_.padEnd),
	repeat: _fp(_.repeat),
	replace: _fp(_.replace),
	split: _fp(_.split),
	startsWith: _fp(_.startsWith),
	substring: _fp(_.substring),
	camelCase: _fp(_.camelCase),
	isCamelCase: _fp(_.isCamelCase),
	capitalize: _fp(_.capitalize),
	isCapitalized: _fp(_.isCapitalized),
	kebabCase: _fp(_.kebabCase),
	isKebabCase: _fp(_.isKebabCase),
	localeLowerCase: _fp(_.localeLowerCase),
	isLocaleLowerCase: _fp(_.isLocaleLowerCase),
	localeUpperCase: _fp(_.localeUpperCase),
	isLocaleUpperCase: _fp(_.isLocaleUpperCase),
	lowerCase: _fp(_.lowerCase),
	isLowerCase: _fp(_.isLowerCase),
	pascalCase: _fp(_.pascalCase),
	isPascalCase: _fp(_.isPascalCase),
	snakeCase: _fp(_.snakeCase),
	isSnakeCase: _fp(_.isSnakeCase),
	upperFirst: _fp(_.upperFirst),
	isUpperFirst: _fp(_.isUpperFirst),
	upperCase: _fp(_.upperCase),
	isUpperCase: _fp(_.isUpperCase),
	trim: _fp(_.trim),
	trimEnd: _fp(_.trimEnd),
	trimStart: _fp(_.trimStart),

	allSettled: _fp(_.allSettled),
	all: _fp(_.all),
	race: _fp(_.race),

	reject: _fp(_.reject),
	resolve: _fp(_.resolve),

	catch: _fp(_.catch),
	finally: _fp(_.finally),
	then: _fp(_.then),

	sleep: _fp(_.sleep),
	timeout: _fp(_.timeout),

	sets: {
		intersection: _fp(_.sets.intersection),
		union: _fp(_.sets.union),
		xor: _fp(_.sets.xor),
	},
}