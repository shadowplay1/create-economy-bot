import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
	initialCommand: 'node ../lib/src/index.js' // 'ts-node ../src/index.ts'
})

// ts-node ../src/index.ts behind
tester.expect('--test', 'cli test 1')
tester.expect('--test', 'cli test 2')
tester.expect('--test', 'cli test 3')
tester.expect('--test', 'cli test 4')

tester.finish()

