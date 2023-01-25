export class CLITestError extends Error {
    constructor(message: string) {
        super(message)

        this.name = 'CLITestError'
    }
}
