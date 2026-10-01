import Fs from 'node:fs/promises'
import Path from 'node:path'

const rootDir = Path.resolve(import.meta.dirname, '..')
process.chdir(rootDir)

const pkg = JSON.parse(await Fs.readFile('package.json', 'utf8'))

pkg.exports = {}

const srcDir = 'src'

const recurse = async (dirPath) => {
	const files = await Fs.opendir(dirPath)
	for await (const entry of files) {
		if (entry.name.startsWith('_')) { continue }

		if (entry.isDirectory()) {
			if (false
				|| entry.name === 'node_modules'
				|| entry.name === 'testing'
				|| entry.name === 'benchmarking'
			) { continue }

			await recurse(Path.join(dirPath, entry.name))
		}
		else {
			if (false
				|| !entry.name.endsWith('.js')
				|| entry.name.endsWith('.test.js')
				|| entry.name.endsWith('.benchmark.js')
			) { continue }

			const filePath = Path.join(dirPath, entry.name)
			const modulePath = Path.relative(srcDir, filePath).slice(0, -3)
			const key = modulePath === 'index' ? '.'
				: `./${modulePath.endsWith('/index') ? modulePath.slice(0, -6) : modulePath}`
			pkg.exports[key] = `./${filePath}`
		}
	}
}

await recurse(srcDir)
await Fs.writeFile('package.json', `${JSON.stringify(pkg, null, 2)}\n`)
