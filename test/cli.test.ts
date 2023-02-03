import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
    initialCommand: 'node ./lib/src/index.js'
})

tester.expect('--test 0', 'cli test 0 (error test 0) (normal)').toError()


tester.expect('--test 1', 'cli test 1 (normal)').toSucceed()
tester.expect('--test 2', 'cli test 2 with info included').toSucceed().toIncludeInfo()
tester.expect('--test 3', 'cli test 3 with warn included').toSucceed().toIncludeWarning()
tester.expect('--test 4', 'cli test 4 with both info and warn included').toSucceed().toIncludeInfo().toIncludeWarning()

tester.expect('--test 5', 'cli test 5 (error test 1)').toError()
tester.expect('--test 6', 'cli test 6 (error test 2) (with info included)').toError().toIncludeInfo()
tester.expect('--test 6', 'cli test 6 (error test 3) (with warn included)').toError().toIncludeWarning()

tester.expect('--test 6', 'cli test 6 (error test 4) (with both info and warn included)')
    .toError()
    .toIncludeInfo()
    .toIncludeWarning()

tester.finish()
