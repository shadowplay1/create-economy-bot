import { execSync } from 'child_process'
import { IExecutionResult } from '../types/ExecutionResult.interface'

/**
 * Executes the command and gets its output.
 * @param command The command to execute.
 * @returns Command execution result object
 */
export const executeCommand = (command: string): IExecutionResult => {
    try {
		const stdout = execSync(command)

		return {
			status: true,
			stdout: stdout.toString(),
			err: null,
			stderr: null
		}
	} catch (err) {
		return {
			status: false,
			stdout: null,
			err,
			stderr: err.stderr.toString()
		}
    }
}
