import { colors } from '../../src/structures/colors.structure'

import { executeCommand } from './executeCommand.function'
import { CLITestError } from './CLITestError'

import { ICLITesterOptions } from '../types/CLITesterOptions.interface'

import { 
	ICLITest, ICLITesterOptions,
	ITestFactory, CLILogType
} from '../types/CLITest.interface'

import { getLogType, isLogTypeIncluded } from '../utils/cli.util'

export class ResultExpecter {

    /**
     * Tests array that will be used when all the tests are finished.
     */
    public tests: ICLITest[] = []

    /**
     * CLI tester options object.
     */
    public initialCommand: ICLITesterOptions

    public constructor(options = {} as any) {
        this.tests = []
        this.initialCommand = options.initialCommand
    }

    /**
     * Returns a factory function to test the command output.
     * @param commandToTest The CLI command to test.
     * @param description Test description.
     * @returns {ITestFactory} Testing factory object.
     */
    public expect(commandToTest: string, description: string): ITestFactory {
        const cmd = `${this.initialCommand} ${commandToTest}`

        const executionResult = executeCommand(cmd)
        const stdout = executionResult?.stdout

        if (!executionResult.status) {
            throw new CLITestError(
                `Command "${cmd}" failed:\n` +
                executionResult?.stderr || `${executionResult.err?.name || 'Error'}: ` +
                `${executionResult.err?.message.replace(`Command failed: ${cmd}`, '')}`
            )
        }

        const testFor = (expectedType: CLILogType) => {
			const receivedType = getLogType(stdout)

			const testObject = {
                passed: expectedType == receivedType,
                expectedType,
				receivedType,
                stdout: stdout as string,
                description
            }

			this.tests.push(testObject)
        }

		const toSucceed = () => {
			testFor(CLILogType.SUCCESS)
		}

        const toError = () => {
            testFor(CLILogType.ERROR)
        }

		const toIncludeWarning = () => {
			return
		}

        const toIncludeInfo = () => {
            return
        }

        // TODO: testing functions
        return {
            toSucceed,
            toError,
			toIncludeWarning,
            toIncludeInfo
        }
    }

    /**
     * Finishes the tests and outputs the results in the console.
     * @returns {void}
     */
    public finish(): void {
        console.log('tests finished')
        console.log(`${this.tests.filter(test => test.passed).length}/${this.tests.length} tests passed\n`)

        console.log(this.tests.map(test => `${test.description} - ${test.passed ? `expected "${test.expectedType}" - passed` : `expected "${test.expectedType}", but received "${test.receivedType}" - failed`}`).join('\n'))
    }
}

