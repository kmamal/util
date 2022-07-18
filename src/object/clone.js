
// TODO: use structuredClone when it becomes available?
const clone = (obj) => JSON.parse(JSON.stringify(obj))

module.exports = { clone }
