const { benchmark } = require('@kmamal/benchmarking')

benchmark("array iteration", {
	cases: {
		"for index": () => {
			let _
			const a = new Array(1000)
			for (let i = 0; i < a.length; i++) { _ = a[i] }
		},
		"for index - const length": () => {
			let _
			const a = new Array(1000)
			const n = a.length
			for (let i = 0; i < n; i++) { _ = a[i] }
		},
		"for of": () => {
			let _
			const a = new Array(1000)
			for (const x of a) { _ = x }
		},
		"while": () => {
			let _
			const a = new Array(1000)
			let index = 0
			const end = a.length - 1
			while (index < end) { _ = a[index++] }
		},
		"for in": () => {
			let _
			const a = new Array(1000)
			for (const x in a) { _ = a[x] }
		},
	},

	time: 1e2,
})

benchmark("object iterate keys", {
	cases: {
		"Object.keys": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			const keys = Object.keys(a)
			for (let i = 0; i < keys.length; i++) { _ = keys[i] }
		},
		"Object.entries": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			const entries = Object.entries(a)
			for (let i = 0; i < entries.length; i++) { _ = entries[i][0] }
		},
		"for in": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			for (const x in a) {
				_ = x
			}
		},
		"for in - guarded": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			for (const x in a) {
				if (!Object.hasOwn(a, x)) { continue }
				_ = x
			}
		},
	},
	time: 1e2,
})

benchmark("object iterate values", {
	cases: {
		"Object.keys": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			const keys = Object.keys(a)
			for (let i = 0; i < keys.length; i++) { _ = a[keys[i]] }
		},
		"Object.values": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			const values = Object.values(a)
			for (let i = 0; i < values.length; i++) { _ = values[i] }
		},
		"Object.entries": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			const entries = Object.entries(a)
			for (let i = 0; i < entries.length; i++) { _ = entries[i][1] }
		},
		"for in": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			for (const x in a) {
				_ = a[x]
			}
		},
		"for in - guarded": () => {
			let _
			const a = { a: 1, b: 2, c: 3, d: 4, e: 5 }
			for (const x in a) {
				if (!Object.hasOwn(a, x)) { continue }
				_ = a[x]
			}
		},
	},
	time: 1e2,
})

benchmark("static string join", {
	pre: () => [ 'a'.repeat(100), 'b'.repeat(200) ],
	cases: {
		"s+s": ([ a, b ]) => {
			const _ = a + b + a + b + a + b + a + b + a + b + a + b + a + b + a + b + a + b + a + b
		},
		"[].join": ([ a, b ]) => {
			const _ = [ a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b ].join('')
		},
		"`${}`": ([ a, b ]) => {
			const _ = `${a}${b}${a}${b}${a}${b}${a}${b}${a}${b}${a}${b}${a}${b}${a}${b}${a}${b}${a}${b}`
		},
	},
	time: 1e2,
})

benchmark("iterative string join", {
	pre: () => new Array(100).fill('a'.repeat(100)),
	cases: {
		"s+s": (a) => {
			let _ = ''
			for (let i = 0; i < a.length; i++) {
				_ += a
			}
		},
		"[].join": (a) => {
			const _ = a.join('')
		},
	},
	time: 1e2,
})

benchmark("hashtable write", {
	pre: () => Array.from({ length: 1000 }, (_, i) => `${i}`),
	cases: {
		object: (data) => {
			const a = Object.create(null)
			for (const x of data) { a[x] = x }
		},
		map: (data) => {
			const map = new Map()
			for (const x of data) { map.set(x, x) }
		},
	},
	time: 1e2,
})

benchmark("hashtable read", {
	pre: () => {
		const object = Object.create(null)
		const map = new Map()
		const data = Array.from({ length: 1000 }, (_, i) => `${i}`)

		for (const x of data) {
			object[x] = x
			map.set(x, x)
		}

		return { object, map, data }
	},
	cases: {
		object: ({ object, data }) => {
			let _
			for (const x of data) { _ = object[x] }
		},
		map: ({ map, data }) => {
			let _
			for (const x of data) { _ = map.get(x) }
		},
	},
	time: 1e2,
})

benchmark("number to string", {
	cases: {
		"`${}`": () => {
			const _ = `${Math.random()}`
		},
		".toString()": () => {
			const _ = Math.random().toString()
		},
	},
	time: 1e2,
})

benchmark("array append", {
	cases: {
		"a.push(x)": () => {
			const a = []
			for (let i = 0; i < 1000; i++) { a.push(i) }
		},
		"a[a.length] = x": () => {
			const a = []
			for (let i = 0; i < 1000; i++) { a[a.length] = i }
		},
		"a[i] = x": () => {
			const a = []
			for (let i = 0; i < 1000; i++) { a[i] = i }
		},
		"a[i] = x (prealloc)": () => {
			const a = new Array(1000)
			for (let i = 0; i < 1000; i++) { a[i] = i }
		},
	},
	time: 1e2,
})

benchmark("object access", {
	pre: () => Array.from({ length: 1000 }, (_, i) => ({ x: i })),
	cases: {
		dot: (a) => {
			let _
			for (let i = 0; i < a.length; i++) {
				_ = a[i].x
			}
		},
		spread: (a) => {
			let _
			for (let i = 0; i < a.length; i++) {
				const { x } = a[i]
				_ = x
			}
		},
	},
	time: 1e2,
})

benchmark("array copy", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		"slice": (a) => {
			const b = a.slice()
			b[30] = 5
		},
		"spread": (a) => {
			const b = [ ...a ]
			b[30] = 5
		},
		"Array.from": (a) => {
			const b = Array.from(a)
			b[30] = 5
		},
		"manual copy": (a) => {
			const { length } = a
			const b = new Array(length)
			for (let i = 0; i < length; i++) {
				b[i] = a[i]
			}
			b[30] = 5
		},
	},
	time: 1e2,
})

benchmark("contains", {
	pre: () => ({
		array: Array.from({ length: 1000 }, (_, i) => i),
		set: new Set(Array.from({ length: 1000 }, (_, i) => i)),
	}),
	cases: {
		array: ({ array }) => {
			let _
			for (let i = 0; i < 1000; i++) {
				_ = array.indexOf(i) !== -1
			}
		},
		set: ({ set }) => {
			let _
			for (let i = 0; i < 1000; i++) {
				_ = set.has(i)
			}
		},
	},
	time: 1e2,
})

benchmark("append vs prepend", {
	cases: {
		push: () => {
			const a = []
			for (let i = 0; i < 1000; i++) {
				a.push(i)
			}
		},
		unshift: () => {
			const a = []
			for (let i = 0; i < 1000; i++) {
				a.unshift(i)
			}
		},
	},
	time: 1e2,
})

benchmark("conditional initialization", {
	cases: {
		if: () => {
			let _
			let a
			let b
			if (Math.random() < 0.5) {
				a = 1
				b = 2
			} else {
				a = 2
				b = 1
			}
			_ = a
			_ = b
		},
		spread: () => {
			let _
			const [ a, b ] = Math.random() < 0.5 ? [ 1, 2 ] : [ 2, 1 ]
			_ = a
			_ = b
		},
	},
	time: 1e2,
})

benchmark("array write index", {
	pre: () => {
		const N = 100
		const M = 100
		const a = new Array(N * M)
		return { N, M, a }
	},
	cases: {
		"always increment": ({ N, M, a }) => {
			let writeIndex = 0
			for (let i = 0; i < N; i++) {
				for (let j = 0; j < M; j++) {
					a[writeIndex++] = j
				}
			}
		},
		"staged increment": ({ N, M, a }) => {
			let writeIndex = 0
			for (let i = 0; i < N; i++) {
				for (let j = 0; j < M; j++) {
					a[writeIndex + j] = j
				}
				writeIndex += M
			}
		},
		"multiply add": ({ N, M, a }) => {
			for (let i = 0; i < N; i++) {
				for (let j = 0; j < M; j++) {
					a[i * N + j] = j
				}
			}
		},
		"always decrement": ({ N, M, a }) => {
			let writeIndex = N
			for (let i = 0; i < N; i++) {
				for (let j = 0; j < M; j++) {
					a[writeIndex--] = j
				}
			}
		},
		"staged decrement": ({ N, M, a }) => {
			let writeIndex = N * M - 1
			for (let i = 0; i < N; i++) {
				for (let j = 0; j < M; j++) {
					a[writeIndex - (j + 1)] = j
				}
				writeIndex -= M
			}
		},
		"multiply sub": ({ N, M, a }) => {
			for (let i = 0; i < N; i++) {
				for (let j = 0; j < M; j++) {
					a[(N - (i + 1)) * M + M - (j + 1)] = j
				}
			}
		},
	},
	time: 1e2,
})

benchmark("array pairwise", {
	pre: () => Array.from({ length: 1000 }, (_, i) => i),
	cases: {
		indexes: (a) => {
			let _
			for (let i = 1; i < 1000; i++) {
				_ = a[i - 1] + a[i]
			}
		},
		variable: (a) => {
			let _
			let prev = a[0]
			for (let i = 1; i < 1000; i++) {
				_ = prev + a[i]
				prev = a[i]
			}
		},
	},
	time: 1e2,
})

benchmark("min max", {
	pre: () => ({
		math: (x, a, b) => Math.min(Math.max(x, a), b),
		ternary: (x, a, b) => x < a ? a : x > b ? b : x,
	}),
	cases: {
		math: ({ math }) => {
			const _ = math(Math.random(), 0.25, 0.75)
		},
		ternary: ({ ternary }) => {
			const _ = ternary(Math.random(), 0.25, 0.75)
		},
	},
	time: 1e2,
})

benchmark("array max", {
	pre: () => Array.from({ length: 1000 }, Math.random),
	cases: {
		"Math.max": (a) => {
			let _
			for (let i = 0; i < a.length; i++) {
				_ = Math.max(_, a[i])
			}
		},
		"if (x > y)": (a) => {
			let _ = a[0]
			for (let i = 1; i < a.length; i++) {
				const x = a[i]
				if (x > _) { _ = x }
			}
		},
	},
	time: 1e2,
})
