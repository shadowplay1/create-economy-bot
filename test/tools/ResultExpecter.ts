import { existsSync, mkdirSync } from 'fs'

import {
    consoleColors as colors,
    colorStringLength, colorCodePrefix
} from '../../src/structures/colors.structure'

import { executeCommand } from './executeCommand.function'

import {
    name as cliPackageName,
    version as cliPackageVersion,
} from '../../package.json'

import { CLITestError } from './CLITestError'
import { LogWriter } from './LogWriter'

import {
    ICLITest, ICLITesterOptions,
    ITestFactory, CLILogType
} from '../types/CLITest.interface'

import {
    getLogType, isLogTypeIncluded,
} from '../utils/cli.util'

export class ResultExpecter {

    /**
     * Tests array that will be used when all the tests are finished.
     */
    private _tests: ICLITest[] = []

    private _logWriter = new LogWriter({
        separator: '\n\n'
    })

    /**
     * CLI tester options object.
     */
    public initialCommand: ICLITesterOptions

    public constructor(options = {} as any) {
        this._tests = []
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
            const receivedType = getLogType(stdout as string)

            const testObject: ICLITest = {
                command: cmd,
                passed: expectedType == receivedType,
                expectedType,
                receivedType,
                stdout: stdout as string,
                description
            }

            this._tests.push(testObject)
        }

        const testIncludingFor = (expectedType: CLILogType) => {
            const isLogIncluded = isLogTypeIncluded(expectedType, stdout as string)

            const testObject: ICLITest = {
                command: cmd,
                passed: isLogIncluded,
                expectedType,
                receivedType: isLogIncluded ? expectedType : CLILogType.NONE,
                stdout: stdout as string,
                description
            }

            this._tests.push(testObject)
        }

        const resultIncludingTests = {
            toIncludeWarning() {
                testIncludingFor(CLILogType.WARN)
                return resultIncludingTests
            },
            toIncludeInfo () {
                testIncludingFor(CLILogType.INFO)
                return resultIncludingTests
            }
        }

        const resultingTests = {
            toSucceed() {
                testFor(CLILogType.SUCCESS)
                return resultIncludingTests
            },
            toError () {
                testFor(CLILogType.ERROR)
                return resultIncludingTests
            }
        }

        return {
            ...resultingTests,
            ...resultIncludingTests
        }
    }

    /**
     * Finishes the tests, writes the log file and outputs the results in the console.
     * @returns {void}
     */
    public finish(): void {
        const finishDate = new Date()
        const tests = this._tests.length

        const [
            month, day, year,
            hours, minutes, seconds
        ] = [
                finishDate.getMonth(), finishDate.getDay(), finishDate.getFullYear(),
                finishDate.getHours(), finishDate.getMinutes(), finishDate.getSeconds(),
            ]

        const logFilePath = `./logs/cli-test-${month}-${day}-${year}_${hours}-${minutes}-${seconds}.log`

        const passedTests = this._tests.filter(test => test.passed).length
        const failedTests = tests - passedTests

        const logFileInputs = [
            `${cliPackageName}@${cliPackageVersion} - CLI Test - ${new Date().toLocaleString('en')}`,
            `Successfully ran ${tests} tests:\n${passedTests}/${tests} tests passed (${failedTests} tests failed)`,

            `Tests List:\n${this._tests.map(
                (test, testIndex) => `${testIndex + 1}. ${test.description} - expecting for ${test.expectedType}`
            ).join('\n')}\n`,

            `Test Results:\n\n` +
            this._tests.map((test, testIndex) => {
                const filteredCommandOutput = test.stdout
                    .split('\n')
                    .map(line =>
                        line.startsWith(colorCodePrefix) ?
                            line.slice(colorStringLength, (colorStringLength - 1) * (-1)) :
                            line
                    )
                    .join('\n')

                const testResultLine = `>>> Test #${testIndex + 1} - ${test.description} (${test.command}): ` +
                    `${test.passed ? 'passed' : 'failed'}.\nExpected result is ${test.expectedType} and ` +
                    `received result is ${test.receivedType}.\nThe output was:\n` +
                    `${filteredCommandOutput}`

                return testResultLine
            }).join('\n\n\n')
        ]

        // todo: colored logs
        console.log(`${colors.lightcyan}Testing Finished${colors.reset}`)
        console.log(
            `${passedTests}/${tests} tests passed\n`
        )

        console.log(
            this._tests
                .map(
                    test => `${test.description} - ${test.passed ? `expected "${test.expectedType}" - passed` : `expected "${test.expectedType}", but received "${test.receivedType}" - failed`}`
                )
                .join('\n')
        )

        for (const logFileInput of logFileInputs) {
            this._logWriter.addInput(logFileInput)
        }

        try {
            const currentDirectory = process.cwd().replaceAll('\\', '/')
            const cleanLogFilePath = logFilePath.startsWith('.') ? logFilePath.slice(2) : logFilePath

            if (!existsSync('./logs')) {
                mkdirSync('./logs')
            }

            this._logWriter.write(logFilePath)

            console.log('\nThe full log of the run can be found in:')
            console.log(`${currentDirectory}/${cleanLogFilePath}\n`)
        } catch (err: any) {
            const error: Error = err
            console.error(`Failed to write the log file of this run: ${error.name || 'Error'}: ${error.message}`)
        }
    }
}
