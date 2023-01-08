const {
	__binarySearch,
	__binarySearchFirst,
	__binarySearchLast,
} = require('../binary')
const {
	__interpolationSearch,
	__interpolationSearchFirst,
	__interpolationSearchLast,
} = require('../interpolation')
const {
	__exponentialSearch,
	__exponentialSearchFirst,
	__exponentialSearchLast,
} = require('../exponential')
const {
	__linearSearch,
	__linearSearchRight,
} = require('../linear')

const K = 100
const N = 100
const T = 1000
const A = new Array(N)

const randomKey = () => Math.floor(Math.random() * K)
const sub = (a, b) => a - b
const eq = (a, b) => a === b

for (let i = 0; i < T; i++) {
	process.stdout.write('.')
	for (let j = 0; j < N; j++) {
		A[j] = randomKey()
	}
	A.sort(sub)

	for (let x = 0; x < K; x++) {
		const a = __binarySearch(A, 0, N, x, sub)
		const af = __binarySearchFirst(A, 0, N, x, sub)
		const al = __binarySearchLast(A, 0, N, x, sub)

		const b = __interpolationSearch(A, 0, N, x, sub)
		const bf = __interpolationSearchFirst(A, 0, N, x, sub)
		const bl = __interpolationSearchLast(A, 0, N, x, sub)

		const c1 = __exponentialSearch(A, 0, N - 1, x, sub)
		const cf1 = __exponentialSearchFirst(A, 0, N - 1, x, sub)
		const cl1 = __exponentialSearchLast(A, 0, N - 1, x, sub)

		const c2 = __exponentialSearch(A, N - 1, 0, x, sub)
		const cf2 = __exponentialSearchFirst(A, N - 1, 0, x, sub)
		const cl2 = __exponentialSearchLast(A, N - 1, 0, x, sub)

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
			console.log({ A, x, a, af, al, b, bf, bl, c1, cf1, cl1, c2, cf2, cl2, dl, dr })
			process.stdout.write('\n')
			process.exit()
		}
	}
}
process.stdout.write('\n')
