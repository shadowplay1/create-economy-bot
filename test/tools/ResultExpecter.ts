import { executeCommand } from './executeCommand.function'

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
    public expect(commandToTest: string, _description: string): ITestFactory {
        const cmd = `${this.initialCommand} ${commandToTest}`
        
        // todo: command output handling
        executeCommand(cmd)

        // todo: testing functions
        return {
            toSucceed(): any {
                return commandToTest
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
        console.log('tests finished')
    }
}
