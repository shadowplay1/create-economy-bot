import { exec } from 'child_process'
import { IExecutionResult } from '../types/ExecutionResult.interface'

/**
 * Executes the command and gets its output.
 * @param command The command to execute.
 * @returns Command execution result object
 */
export const executeCommand = (command: string): Promise<IExecutionResult> => new Promise(resolve => {
    exec(command, (err, stdout, stderr) => {
        if (err || stderr) {
            resolve({
                status: false,
                err,
                stderr
            })
        }

        return {
            status: true,
            stdout
        }
    })
})
