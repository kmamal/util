const { benchmark } = require('@kmamal/benchmarking')
const { clone } = require('./clone')

benchmark("object :: clone", {
	pre: () => [
		Array.from({ length: 100 }, (_, i) => i),
		{ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 },
		{
			a: 5,
			b: "Hello, World!",
			c: [
				new Map([
					[ { foo: 42 }, 6 ],
					[ "bar", { baz: "baz" } ],
					[ false, null ],
				]),
				new Set([ 1, 2, 3, 4, 5 ]),
			],
		},
	],
	cases: {
		"@kmamal/object/clone": ([ a, b ]) => {
			let _
			_ = clone(a)
			_ = clone(b)
		},
		"structuredClone": ([ a, b ]) => {
			let _
			_ = structuredClone(a)
			_ = structuredClone(b)
		},
	},
	time: 1e2,
})
