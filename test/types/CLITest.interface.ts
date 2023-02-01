export interface ICLITest {

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
     * Stdout command output.
     */
    stdout: string
}

export interface ICLITesterOptions {

    /**
     * The command that will be used to test the CLI.
     */
    initialCommand: string
}

export interface ITestFactory {
    toSucceed(): void
    toError(): void
	toIncludeWarning(): void
    toIncludeInfo(): void
}

export enum CLILogType {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    NONE = 'none'
}

