const { LinkedList } = require('@kmamal/structs/linked-list')
const { mergeWith } = require('./merge')

let _state
const _alternate = () => (_state *= -1)

const weaveTwo = (a, b) => {
	_state = 1
	return mergeWith(a, b, _alternate)
}

const weave = (arr) => {
	if (arr.length === 0) { return [] }
	if (arr.length === 1) { return Array.from(arr[0]) }
	if (arr.length === 2) { return weaveTwo(arr[0], arr[1]) }

	const sources = new LinkedList()
	let totalLength = 0
	for (let i = arr.length - 1; i >= 0; i--) {
		const a = arr[i]
		totalLength += a.length
		sources.unshift(a)
	}

	const res = new Array(totalLength)
	let writeIndex = 0

	let depth = 0
	let node
	let value
	while (sources.size() > 1) {
		node = sources._head
		for (;;) {
			if (!node) { return res }
			value = node.value
			if (value.length > depth) { break }
			sources.shift(node)
			node = sources._head
		}

		loop:
		for (;;) {
			res[writeIndex++] = value[depth]

			for (;;) {
				const next = node.next
				if (!next) { break loop }
				value = next.value
				if (value.length === depth) {
					sources._removeAfter(node)
					continue
				}
				node = next
				break
			}
		}
		depth++
	}

	const rest = sources._head.value
	while (depth < rest.length) {
		res[writeIndex++] = rest[depth++]
	}
	return res
}

module.exports = {
	weaveTwo,
	weave,
}
