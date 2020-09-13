
const getParent = (index) => Math.floor((index - 1) / 4)

const getTopLeft = (index) => index * 4 + 1

const getTopRight = (index) => index * 4 + 2

const getBottomLeft = (index) => index * 4 + 3

const getBottomRight = (index) => index * 4 + 4

module.exports = {
	getParent,
	getTopLeft,
	getTopRight,
	getBottomLeft,
	getBottomRight,
}
