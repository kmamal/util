
const _finally = (onSettled) => (p) => p.finally(onSettled)

module.exports = { finally: _finally }
