
const _finally = (onSettled) => (p) => p.catch(onSettled)

module.exports = { finally: _finally }
