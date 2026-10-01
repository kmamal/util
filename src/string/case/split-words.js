
const _isSeparator = (char) => char === '-' || char === '_'
const _isUpper = (char) => char !== char.toLowerCase()
const _isLower = (char) => char !== char.toUpperCase()
const _isDigit = (char) => char >= '0' && char <= '9'

const __splitWords = (str) => {
	const chars = Array.from(str)
	const { length } = chars

	let start = 0
	while (start < length && _isSeparator(chars[start])) { start++ }

	let end = length
	while (end > start && _isSeparator(chars[end - 1])) { end-- }

	const words = []
	let word = ''
	for (let i = start; i < end; i++) {
		const char = chars[i]
		if (_isSeparator(char)) {
			if (word) { words.push(word) }
			word = ''
			continue
		}

		if (word && _isUpper(char)) {
			const prev = chars[i - 1]
			const next = chars[i + 1]
			if (_isLower(prev) || _isDigit(prev) || (_isUpper(prev) && next !== undefined && _isLower(next))) {
				words.push(word)
				word = ''
			}
		}

		word += char
	}
	if (word) { words.push(word) }

	return {
		leading: start,
		words,
		trailing: length - end,
	}
}

module.exports = { __splitWords }
