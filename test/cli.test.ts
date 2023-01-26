import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter()

// ts-node ../src/index.ts behind
tester.expect('--test', 'cli test 1')
tester.expect('--test', 'cli test 2')
tester.expect('--test', 'cli test 3')
tester.expect('--test', 'cli test 4')

tester.finish()

