export const expect = (command: string) => {
    return {
        toSucceed(): any {
            return command
        }
    }
}
