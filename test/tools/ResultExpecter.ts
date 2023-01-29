import { executeCommand } from './executeCommand.function'
import { CLITestError } from './CLITestError'

import { ICLITest } from '../types/CLITest.interface'
import { ITestFactory } from '../types/TestFactory.interface'

import { ICLITesterOptions } from '../types/CLITesterOptions.interface'

export class ResultExpecter {

    /**
     * Tests array that will be used when all the tests are finished.
     */
    public tests: ICLITest[] = []

    /**
     * CLI tester options object.
     */
    public initialCommand: ICLITesterOptions

    constructor(options = {} as any) {
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
					`${executionResult.err?.message.replace(`Command failed: ${cmd}`)}`
			)
		}

        // todo: testing functions
        return {
            toSucceed(): any {
				this.tests.push({
					passed: true,
					expectedType: 'success',
					stdout,
					description
				})
				console.log(1)
            },

            toError(): any {
                return commandToTest
            },

            toSendInfo(): any {
                return commandToTest
            }
        }
    }

    /**
     * Finishes the tests and outputs the results in the console.
     * @returns {void}
     */
    public finish(): void {
        console.log('tests finished\n\n')

		console.log(this.tests.map(x => `${description} - ${x.passed ? 'passed' : 'failed'}`).join(', '))
    }
}

