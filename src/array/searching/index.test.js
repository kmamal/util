const { test } = require('@kmamal/testing')

const {
	__binarySearch,
} = require('./binary')
const {
	__interpolationSearch,
} = require('./interpolation')
const {
	__exponentialSearch,
} = require('./exponential')
const {
	__linearSearch,
	__linearSearchRight,
} = require('./linear')
const {
	strictLess,
	strictGreater,
} = require('../../function/compare')

test("array.searching", (t) => {
	const K = 100
	const N = 100
	const T = 1000
	const A = new Array(N)

	const randomKey = () => Math.floor(Math.random() * K)
	const sub = (a, b) => a - b
	const eq = (a, b) => a === b

	for (let i = 0; i < T; i++) {
		// process.stdout.write('.')
		for (let j = 0; j < N; j++) {
			A[j] = randomKey()
		}
		A.sort(sub)

		for (let x = 0; x < K; x++) {
			const a = __binarySearch(A, 0, N, x, sub)
			const af = __binarySearch(A, 0, N, x, strictLess(sub))
			const al = __binarySearch(A, 0, N, x, strictGreater(sub))

			const b = __interpolationSearch(A, 0, N, x, sub)
			const bf = __interpolationSearch(A, 0, N, x, strictLess(sub))
			const bl = __interpolationSearch(A, 0, N, x, strictGreater(sub))

			const c1 = __exponentialSearch(A, 0, N, x, sub)
			const cf1 = __exponentialSearch(A, 0, N, x, strictLess(sub))
			const cl1 = __exponentialSearch(A, 0, N, x, strictGreater(sub))

			const c2 = __exponentialSearch(A, N, 0, x, sub)
			const cf2 = __exponentialSearch(A, N, 0, x, strictLess(sub))
			const cl2 = __exponentialSearch(A, N, 0, x, strictGreater(sub))

			const dl = __linearSearch(A, 0, N, x, eq)
			const dr = __linearSearchRight(A, 0, N, x, eq)

			if (false
				|| af !== bf || bf !== cf1 || cf1 !== cf2 || (dl !== -1 && af !== dl)
				|| al !== bl || bl !== cl1 || cl1 !== cl2 || (dr !== -1 && al !== dr + 1)
				|| a < af || al < a
				|| b < bf || bl < b
				|| c1 < cf1 || cl1 < c1
				|| c2 < cf2 || cl2 < c2
			) {
				throw Object.assign(new Error("failed for"), {
					case: { A, x, a, af, al, b, bf, bl, c1, cf1, cl1, c2, cf2, cl2, dl, dr },
				})
				// process.stdout.write('\n')
				// process.exit()
			}
		}
	}
	// process.stdout.write('\n')
})
