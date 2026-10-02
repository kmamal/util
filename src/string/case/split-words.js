
const _isSeparator = (char) => char === '-' || char === '_'
const _isUpper = (char) => char !== char.toLowerCase()
const _isLower = (char) => char !== char.toUpperCase()
const _isDigit = (char) => char >= '0' && char <= '9'
const _isWordChar = (char) => _isLower(char) || _isUpper(char) || _isDigit(char)

const _splitToken = (words, chars, start, end) => {
	let isAllCaps = true
	for (let i = start; i < end; i++) {
		if (_isLower(chars[i])) {
			isAllCaps = false
			break
		}
	}

	let word = ''
	for (let i = start; i < end; i++) {
		const char = chars[i]
		if (word && !isAllCaps && _isUpper(char) && _isWordChar(chars[i - 1])) {
			words.push(word)
			word = ''
		}
		word += char
	}
	words.push(word)
}

const __splitWords = (str) => {
	const chars = Array.from(str)
	const { length } = chars

	let start = 0
	while (start < length && _isSeparator(chars[start])) { start++ }

	let end = length
	while (end > start && _isSeparator(chars[end - 1])) { end-- }

	const words = []
	let tokenStart = start
	for (let i = start; i <= end; i++) {
		if (i < end && !_isSeparator(chars[i])) { continue }
		if (i > tokenStart) { _splitToken(words, chars, tokenStart, i) }
		tokenStart = i + 1
	}

	return {
		leading: start,
		words,
		trailing: length - end,
	}
}

module.exports = { __splitWords }
