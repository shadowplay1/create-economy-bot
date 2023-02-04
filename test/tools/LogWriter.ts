import { writeFileSync } from 'fs'
import { CLITestError } from '../tools/CLITestError'

export class LogWriter {
    private _logFileTextInputs: string[]
    public separator: string

    public constructor(options: { separator: string } = {} as any) {
        this._logFileTextInputs = []
        this.separator = options.separator || '\n\n'
    }

    /**
	 * Adds a text input entry to the log file contents.
	 * @param text The text to add.
	 */
    public addInput(text: string): void {
        this._logFileTextInputs.push(text)
    }

    /**
	 * Returns the log file text as a string.
	 * @returns Log file text.
	 */
    public getText(): string {
        return this._logFileTextInputs.join(this.separator)
    }

    /**
	 * Writes the text into a log file.
	 * @param filePath File path and name for a file to be written.
	 * @returns If written successfully, `true` will be returned.
	 * @throws {CLITestError} If failed to write a log file.
	 */
    public write(filePath: string): boolean {
        const textToWrite = this.getText()

        if (!filePath.endsWith('.log')) {
            filePath += '.log'
        }

        try {
            writeFileSync(filePath, textToWrite)
            return true
        } catch (err) {
            throw new CLITestError(
                `Failed to write a log file: ${err.name || 'Error'}: ${err.message}`
            )
        }
    }
}
