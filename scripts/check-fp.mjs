#!/usr/bin/env node

import Path from 'node:path'

import { fileURLToPath } from 'node:url'
const __dirname = Path.dirname(fileURLToPath(import.meta.url))
const cwd = Path.join(Path.dirname(__dirname), 'src')

const [
	{ default: indexModule },
	{ default: fpModule },
] = await Promise.all([
	import(Path.join(cwd, 'index.js')),
	import(Path.join(cwd, 'fp.js')),
])


const ignoredPrefixes = [
	'array2d',
	'heap',
	'tree',
	'searching',
	'sorting',
	'combinations',
	'permutations',
	'product',

	'atIndex',
	'endIndex',
	'startIndex',

	'combine',
	'comm',
	'copy',
	'difference',
	'makeProxy',
	'merge',
	'swap',

	'ieeeFloat',

	'compare',
	'eqBy',
	'identity',
	'noop',

	'getter',
	'empty$$$',
	'object.zip',

	'interpolate',

	'range',
	'xrange',

	'sets.difference',
]

const ordA = 'A'.charCodeAt(0)
const ordZ = 'Z'.charCodeAt(0)
const isClass = (key) => {
	const ord = key.charCodeAt(0)
	return ordA <= ord && ord <= ordZ
}

let hasMissing = false
const recurse = (a, b, path) => {
	for (const [ key, value ] of Object.entries(a)) {
		if (key.startsWith('__') || isClass(key)) { continue }

		const propPath = `${path}.${key}`
		const withoutFp = propPath.slice(3)
		const isIgnored = ignoredPrefixes.find((pre) => withoutFp.startsWith(pre))
		if (isIgnored) { continue }

		if (typeof value === 'object') {
			recurse(a[key], b?.[key], `${path}.${key}`)
			continue
		}

		if (b?.[key]) { continue }


		console.error("missing", `${path}.${key}`)
		hasMissing = true
	}
}

recurse(indexModule, fpModule, 'fp')

if (hasMissing) { process.exit(1) }