export class CLITestError extends Error {
    public constructor(message: string) {
        super(message)

        /**
         * Error name.
         */
        this.name = 'CLITestError'
    }
}
