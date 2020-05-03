
const then = (onFufilled, onRejected) => (p) => p.then(onFufilled, onRejected)

module.exports = { then }
