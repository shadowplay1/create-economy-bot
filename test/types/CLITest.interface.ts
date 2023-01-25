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
    expectedType: 'success' | 'error' | 'info'

    /**
     * Stdout command output.
     */
    stdout: string
}
