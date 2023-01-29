import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
	initialCommand: 'node ./lib/src/index.js' // 'ts-node ../src/index.ts'
})

// ts-node ../src/index.ts behind
tester.expect('--test', 'cli test 1').toSucceed()
tester.expect('--test', 'cli test 2').toSucceed()
tester.expect('--test', 'cli test 3').toSucceed()
tester.expect('--test', 'cli test 4').toSucceed()

tester.finish()
