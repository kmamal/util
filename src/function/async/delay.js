
const delay = (fn, time) => (...args) => {
	setTimeout(() => fn(...args), time)
}

module.exports = { delay }
