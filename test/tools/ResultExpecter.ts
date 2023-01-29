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

        const toSucceed = () => {
            this.tests.push({
                passed: true,
                expectedType: 'success',
                stdout: stdout as string,
                description
            })
        }

        const toError = () => {
            return commandToTest
        }

        const toSendInfo = () => {
            return commandToTest
        }

        // todo: testing functions
        return {
            toSucceed,
            toError,
            toSendInfo
        }
    }

    /**
     * Finishes the tests and outputs the results in the console.
     * @returns {void}
     */
    public finish(): void {
        console.log('tests finished')
        console.log(`${this.tests.filter(test => test.passed).length}/${this.tests.length} tests passed\n`)

        console.log(this.tests.map(test => `${test.description} - ${test.passed ? 'passed' : 'failed'}`).join('\n'))
    }
}

