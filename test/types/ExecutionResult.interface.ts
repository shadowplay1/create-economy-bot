import { ExecException } from 'child_process'

export interface IExecutionResult {
    status: boolean
    err?: ExecException | null,
    stdout?: string
    stderr?: string
}
