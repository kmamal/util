
const covers = (
	[ aStart, aEnd ],
	[ bStart, bEnd ],
) => true
	&& aStart <= bStart
	&& bEnd <= aEnd

module.exports = { covers }
