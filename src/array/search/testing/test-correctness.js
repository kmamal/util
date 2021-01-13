const {
	__binarySearch,
	__binarySearchLeft,
	__binarySearchRight,
} = require('../binary')
const {
	__interpolationSearch,
	__interpolationSearchLeft,
	__interpolationSearchRight,
} = require('../interpolation')
const {
	__exponentialSearch,
	__exponentialSearchLeft,
	__exponentialSearchRight,
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

for (let i = 0; i < T; i++) {
	process.stdout.write('.')
	for (let j = 0; j < N; j++) {
		A[j] = randomKey()
	}
	A.sort(sub)

	for (let x = 0; x < K; x++) {
		const a = __binarySearch(A, 0, N, x, sub)
		const al = __binarySearchLeft(A, 0, N, x, sub)
		const ar = __binarySearchRight(A, 0, N, x, sub)

		const b = __interpolationSearch(A, 0, N, x, sub)
		const bl = __interpolationSearchLeft(A, 0, N, x, sub)
		const br = __interpolationSearchRight(A, 0, N, x, sub)

		const c = __exponentialSearch(A, 0, N, x, sub)
		const cl = __exponentialSearchLeft(A, 0, N, x, sub)
		const cr = __exponentialSearchRight(A, 0, N, x, sub)

		const dl = __linearSearch(A, 0, N, (y) => x === y)
		const dr = __linearSearchRight(A, 0, N, (y) => x === y)

		if (false
			|| al !== bl || bl !== cl || (dl !== -1 && al !== dl)
			|| ar !== br || br !== cr || (dr !== -1 && ar !== dr + 1)
			|| a < al || ar < a
			|| b < bl || br < b
			|| c < cl || cr < c
		) {
			console.log({ A, x, a, al, ar, b, bl, br, c, cl, cr, dl, dr })
			process.stdout.write('\n')
			process.exit()
		}
	}
}
process.stdout.write('\n')
