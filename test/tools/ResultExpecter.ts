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
    ITestFactory, CLILogType,
    IResultIncludingTestsFactory,
    TestIncludingTypes,
    TypeInclusionStatus
} from '../types/CLITest.interface'

import {
    getLogType, isLogTypeIncluded,
} from '../utils/cli.util'

export class ResultExpecter {

    /**
     * Tests array that will be used when all the tests are finished.
     */
    private _tests: ICLITest[] = []

    /**
     * Log writer utility class instance.
     */
    private _logWriter = new LogWriter({
        separator: '\n\n'
    })

    /**
     * Testing start date.
     */
    private _startDate = new Date()

    /**
     * CLI tester options object.
     */
    public initialCommand: ICLITesterOptions

    public constructor(options = {} as any) {
        this.initialCommand = options.initialCommand
    }

    /**
     * Returns a factory function to test the command output.
     * @param commandToTest The CLI command to test.
     * @param description Test description.
     * @returns {ITestFactory} Testing factory object.
     */
    public expect(commandToTest: string, description: string): ITestFactory {
        const expectedIncludingTypes: TestIncludingTypes = {
            warn: TypeInclusionStatus.ANY,
            info: TypeInclusionStatus.ANY
        }

        const receivedIncludingTypes: TestIncludingTypes = {
            warn: TypeInclusionStatus.ANY,
            info: TypeInclusionStatus.ANY
        }

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

        const testFor = (expectedType: CLILogType): void => {
            const expectedLogsIncluded =
                expectedIncludingTypes.warn == receivedIncludingTypes.warn &&
                expectedIncludingTypes.info == receivedIncludingTypes.info

            const isExpectedTypeIncluded =
                expectedType == CLILogType.WARN && receivedIncludingTypes.warn == TypeInclusionStatus.INCLUDED ||
                expectedType == CLILogType.INFO && receivedIncludingTypes.info == TypeInclusionStatus.INCLUDED

            const receivedType = isExpectedTypeIncluded ? expectedType : getLogType(stdout as string)
            const isTestPassed = expectedType == receivedType && expectedLogsIncluded

            const testObject: ICLITest = {
                command: cmd,
                passed: isTestPassed,
                expectedType,
                receivedType,
                expectedIncludingTypes,
                receivedIncludingTypes,
                stdout: stdout as string,
                description
            }

            this._tests.push(testObject)
        }

        const resultIncludingTests = {
            toIncludeWarning(): IResultIncludingTestsFactory {
                const isLogIncluded = isLogTypeIncluded(CLILogType.WARN, stdout as string)

                expectedIncludingTypes.warn = TypeInclusionStatus.INCLUDED
                receivedIncludingTypes.warn = isLogIncluded

                testFor(CLILogType.WARN)
                return resultIncludingTests
            },

            toIncludeInfo(): IResultIncludingTestsFactory {
                const isLogIncluded = isLogTypeIncluded(CLILogType.INFO, stdout as string)

                expectedIncludingTypes.info = TypeInclusionStatus.INCLUDED
                receivedIncludingTypes.info = isLogIncluded

                testFor(CLILogType.INFO)
                return resultIncludingTests
            }
        }

        const resultingTests = {
            toSucceed(): IResultIncludingTestsFactory {
                testFor(CLILogType.SUCCESS)
                return resultIncludingTests
            },

            toError(): IResultIncludingTestsFactory {
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
        const timeTaken = finishDate.getTime() - this._startDate.getTime()

        const totalTests = this._tests.length

        const [
            month, day, year,
            hours, minutes, seconds
        ] = [
            finishDate.getMonth(), finishDate.getDay(), finishDate.getFullYear(),
            finishDate.getHours(), finishDate.getMinutes(), finishDate.getSeconds(),
        ]

        const logFilePath = `./logs/cli-test-${month}-${day}-${year}_${hours}-${minutes}-${seconds}.log`

        const passedTests = this._tests.filter(test => test.passed).length
        const failedTests = totalTests - passedTests

        console.log(
            colors.lightblue
            + `🚀 ${cliPackageName}@${cliPackageVersion} - CLI Test - ${finishDate.toLocaleString('en')} 🚀\n`
            + colors.reset
        )

        const logFileInputs = [
            `${cliPackageName}@${cliPackageVersion} - CLI Test - ${finishDate.toLocaleString('en')}`,
            `Successfully ran ${totalTests} tests:\n${passedTests}/${totalTests} tests passed (${failedTests} tests failed)`,

            `Tests List:\n${this._tests.map(
                (test, testIndex) => `${testIndex + 1}. ${test.description} - expecting for ${test.expectedType}`
            ).join('\n')}\n`,

            'Test Results:\n\n' +

            this._tests.map((test, testIndex) => {
                const [isWarnExpected, isInfoExpected] = [
                    test.expectedIncludingTypes.warn == TypeInclusionStatus.INCLUDED,
                    test.expectedIncludingTypes.info == TypeInclusionStatus.INCLUDED
                ]

                const [isWarnReceived, isInfoReceived] = [
                    test.receivedIncludingTypes.warn == TypeInclusionStatus.INCLUDED,
                    test.receivedIncludingTypes.info == TypeInclusionStatus.INCLUDED
                ]

                const logExpectingMessage = isWarnExpected && isInfoExpected ?
                    'warn and info' :
                    `${isWarnExpected ?
                        'warn' :
                        isInfoExpected ? 'info' : 'none'
                    }`

                const logReceivingMessage = isWarnReceived && isInfoReceived ?
                    'warn and info' :
                    `${isWarnReceived ?
                        'warn' :
                        isInfoReceived ? 'info' : 'none'
                    }`

                // removing color codes from each line if they are in
                const filteredCommandOutput = test.stdout
                    .split('\n')
                    .map(line =>
                        line.startsWith(colorCodePrefix) ?
                            line.slice(colorStringLength, (colorStringLength - 1) * (-1)) :
                            line
                    )
                    .join('\n')

                const testResultLine =
                    `>>> Test #${testIndex + 1} - "${test.description}" (${test.command}): ` +
                    `${test.passed ? 'passed' : 'failed'}.\nExpected result is "${test.expectedType}", ` +
                    `received result is "${test.receivedType}".\n` +
                    `Expected for ${logExpectingMessage} in the output, received ${logReceivingMessage} logs.\n` +
                    `The output was:\n${filteredCommandOutput}`

                return testResultLine
            }).join('\n\n\n')
        ]

        const passedTestsMessage = passedTests == totalTests ?
            colors.lightgreen + `🏁 All ${totalTests} tests passed! 🏁` + colors.reset :
            colors.lightred + `🏁 ${passedTests}/${totalTests} tests passed 🏁` + colors.reset

        for (const rawTestIndex in this._tests) {
            const testIndex = parseInt(rawTestIndex)

            const test = this._tests[testIndex]
            const logColor = test.passed ? colors.lightgreen : colors.lightred

            console.log(
                logColor
                + `Test ${testIndex + 1}/${totalTests} - ${test.description} - ${test.passed ? 'passed ✅' : 'failed ❌'}`
                + colors.reset
            )
        }

        console.log(
            colors.lightcyan + '\n⏱️  Testing finished ' + colors.lightyellow +
            `in ${timeTaken}ms / ${timeTaken / 1000}s ⏱️` + colors.reset
        )

        console.log(passedTestsMessage)

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
            console.log(colors.lightmagenta + '\n📰 The full log of this run can be found in: 📰')

            console.log(
                colors.magenta + `${currentDirectory}/${cleanLogFilePath}` + colors.reset
            )
        } catch (err: any) {
            const error: Error = err

            console.error(
                colors.lightred +
                `❌ Failed to write the log file of this run: ${error.name || 'Error'}: ${error.message} ❌` +
                colors.reset
            )
        }
    }
}
