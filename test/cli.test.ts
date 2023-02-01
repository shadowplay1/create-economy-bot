import { ResultExpecter } from './tools/ResultExpecter'

const tester = new ResultExpecter({
	initialCommand: 'node ./lib/src/index.js'
})

tester.expect('--test 1', 'cli test 1').toSucceed()
tester.expect('--test 2', 'cli test 2').toSucceed()
tester.expect('--test 3', 'cli test 3').toSucceed()
tester.expect('--test 4', 'cli test 4').toSucceed()
tester.expect('--test 5', 'cli test 5 (error test)').toError()

// TODO: write a log file with all tests, 
// expected/received types, description and
// output of each test command
//
// write a function that:
// 1. checks for the `logs/` directory using `fs.existsSync('./logs')`, if not, then `execSync('mkdir ./logs')`
// 2. summarizes the test process in a string variable - the text that will be written later in the file [1]
// 3. iterate over test results object and push the test info in the file text variable [1], separate test results with 1 or 2 blank lines
// 4. write the file with generated text inside and with name `cli-test-{month}-{day}-{year}_{hours}-{minutes}-{seconds}.log`
// 5. when finished, in `ResultExpecter.finish()` method, tell the user where the written log file is located
tester.finish()

// [1] - log file template:
// --------------------------------------
// create-economy-bot - CLI Test - {date}
//
// Successfully ran {testsLength} tests: 
// {passedLength} tests passed, {failedLength} tests failed.
//
// Tests list:
// {testsList} 
// ( {testNumber}. {testDescription}. Expected result is {testExpectedType}. )
//
//
// Test Results:
// {testResults}
// ( #{testNumber} - {testDescription}: {isTestPassed}; expected {testExpectedType}, {testReceivedType}\n{testOutput} )
//
