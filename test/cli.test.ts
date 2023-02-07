import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
    initialCommand: 'node ./lib/src/index.js'
})

tester.expect('--test 1', 'cli test 1 (error test 1) (normal)').toError()

tester.expect('--test 2', 'cli test 2 to succeed (normal)').toSucceed()
tester.expect('--test 3', 'cli test 3 with info included').toSucceed().toIncludeInfo()
tester.expect('--test 4', 'cli test 4 with warn included').toSucceed().toIncludeWarning()
tester.expect('--test 5', 'cli test 5 with both info and warn included')
    .toSucceed()
    .toIncludeInfo()
    .toIncludeWarning()

tester.expect('--test 6', 'cli test 6 (error test 2)').toError()
tester.expect('--test 7', 'cli test 7 (error test 3) (with info included)').toError().toIncludeInfo()
tester.expect('--test 8', 'cli test 8 (error test 4) (with warn included)').toError().toIncludeWarning()

tester.expect('--test 9', 'cli test 9 (error test 5) (with both info and warn included)')
    .toError()
    .toIncludeInfo()
    .toIncludeWarning()

tester.expect('--test 10', 'cli test 10 (only to include info)').toIncludeInfo()
tester.expect('--test 11', 'cli test 11 (only to include warn)').toIncludeWarning()
tester.expect('--test 12', 'cli test 12 (only to include both info and warn)').toIncludeInfo().toIncludeWarning()

tester.finish()
