
const getParent = (index) => Math.floor((index - 1) / 8)

const getFrontTopLeft = (index) => index * 8 + 1

const getFrontTopRight = (index) => index * 8 + 2

const getFrontBottomLeft = (index) => index * 8 + 3

const getFrontBottomRight = (index) => index * 8 + 4

const getBackTopLeft = (index) => index * 8 + 5

const getBackTopRight = (index) => index * 8 + 6

const getBackBottomLeft = (index) => index * 8 + 7

const getBackBottomRight = (index) => index * 8 + 8

module.exports = {
	getParent,
	getFrontTopLeft,
	getFrontTopRight,
	getFrontBottomLeft,
	getFrontBottomRight,
	getBackTopLeft,
	getBackTopRight,
	getBackBottomLeft,
	getBackBottomRight,
}
