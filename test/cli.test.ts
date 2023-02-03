import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
    initialCommand: 'node ./lib/src/index.js'
})

tester.expect('--test 0', 'cli test 0 (error test 0)').toError()


tester.expect('--test 1', 'cli test 1').toSucceed()
tester.expect('--test 2', 'cli test 2').toSucceed()
tester.expect('--test 3', 'cli test 3').toSucceed()
tester.expect('--test 4', 'cli test 4').toSucceed()

tester.expect('--test 5', 'cli test 5 (error test 1)').toError()
tester.expect('--test 6', 'cli test 6 (error test 2)').toError()

tester.finish()
