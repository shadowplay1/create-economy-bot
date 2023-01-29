export class CLITestError extends Error {
    public constructor(message: string) {
        super(message)

        this.name = 'CLITestError'
    }
}
