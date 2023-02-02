import { ExecException } from 'child_process'

export interface IExecutionResult {

    /**
     * The status of the command execution.
     */
    status: boolean

    /**
     * Command execution error object.
     */
    err?: ExecException | null

    /**
     * Command output.
     */
    stdout?: string | null

    /**
     * Command error output.
     */
	stderr?: string | null
}
