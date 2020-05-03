const endpoints1d = require('../endpoints')

const start = (w, h, point) => {
	let x
	let y
	if (point) {
		x = point[0]
		y = point[1]
	}
	return [
		endpoints1d.start(w, x),
		endpoints1d.start(h, y),
	]
}

const end = (w, h, point) => {
	let x
	let y
	if (point) {
		x = point[0]
		y = point[1]
	}
	return [
		endpoints1d.end(w, x),
		endpoints1d.end(h, y),
	]
}

module.exports = {
	start,
	end,
}
