
module.exports = {
	quasi_random: require('./quasi-random'),
	sampling: require('./sampling'),
	seeded: require('./seeded'),
	...require('./choose'),
	...require('./choose-n'),
	...require('./rand-float'),
	...require('./rand-int'),
	...require('./rand'),
	...require('./random'),
	...require('./shuffle'),
}
