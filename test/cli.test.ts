import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
	initialCommand: 'node ./lib/src/index.js'
})

tester.expect('--test 1', 'cli test 1').toSucceed()
tester.expect('--test 2', 'cli test 2').toSucceed()
tester.expect('--test 3', 'cli test 3').toSucceed()
tester.expect('--test 4', 'cli test 4').toSucceed()
tester.expect('--test 5', 'cli test 5 (error test)').toError()

tester.finish()
