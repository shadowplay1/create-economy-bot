export interface ICLITest {

    /**
     * The command that was executed to run the current test.
     */
    command: string

    /**
     * Whether the test passed.
     */
    passed: boolean

    /**
     * Test description.
     */
    description: string

    /**
     * Expected log type of the output.
     */
    expectedType: CLILogType

    /**
     * Received log type of the output.
     */
    receivedType: CLILogType

    /**
     * Expected log types to be included in the output.
     */
    expectedIncludingTypes: TestIncludingTypes

    /**
     * Received log types to be included in the output.
     */
    receivedIncludingTypes: TestIncludingTypes

    /**
     * Stdout command output.
     */
    stdout: string
}

export enum TypeInclusionStatus {
    INCLUDED = 'included',
    NOT_INCLUDED = 'not included',
    ANY = 'any'
}

export type TestTypes = {
    [key in CLILogType]: TypeInclusionStatus
}

export type TestIncludingTypes = Pick<
    TestTypes,
    CLILogType.WARN | CLILogType.INFO
>

export interface ICLITesterOptions {

    /**
     * The command that will be used to test the CLI.
     */
    initialCommand: string
}

export interface IResultIncludingTestsFactory {
    toIncludeWarning(): IResultIncludingTestsFactory
    toIncludeInfo(): IResultIncludingTestsFactory
}

export interface ITestFactory {
    toSucceed(): IResultIncludingTestsFactory
    toError(): IResultIncludingTestsFactory
    toIncludeWarning(): IResultIncludingTestsFactory
    toIncludeInfo(): IResultIncludingTestsFactory
}

export enum CLILogType {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    NONE = 'none'
}
