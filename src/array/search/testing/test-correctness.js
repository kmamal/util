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
	__linearSearch,
	__linearSearchRight,
} = require('../linear')

const K = 10
const N = 100
const T = 1000
const S = 10000
const A = new Array(N)

const randomKey = () => Math.floor(Math.random() * K)
const sub = (a, b) => a - b

for (let i = 0; i < T; i++) {
	process.stdout.write('.')
	for (let j = 0; j < N; j++) {
		A[j] = randomKey()
	}
	A.sort()

	for (let j = 0; j < S; j++) {
		const key = 0 // randomKey()

		const a = __binarySearch(A, 0, N, key, sub)
		const al = __binarySearchLeft(A, 0, N, key, sub)
		const ar = __binarySearchRight(A, 0, N, key, sub)

		const b = __interpolationSearch(A, 0, N, key, sub)
		const bl = __interpolationSearchLeft(A, 0, N, key, sub)
		const br = __interpolationSearchRight(A, 0, N, key, sub)

		const cl = __linearSearch(A, 0, N, (x) => x === key)
		const cr = __linearSearchRight(A, 0, N, (x) => x === key)

		if (false
			|| al !== bl || (cl !== -1 && bl !== cl)
			|| ar !== br || (cr !== -1 && br !== cr + 1)
			|| a < al || ar < a
			|| b < bl || br < b
		) {
			console.log({ A, key, a, al, ar, b, bl, br, cl, cr })
			process.stdout.write('\n')
			process.exit()
		}
	}
}
process.stdout.write('\n')
