
const _catch = (onRejected) => (p) => p.catch(onRejected)

module.exports = { catch: _catch }
