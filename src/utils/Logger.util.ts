import { consoleColors as colors } from '../structures/colors.structure'

export class Logger {

    /**
     * Sends the success log in the console.
     * @param message The message to send.
     */
    public success(message: string): void {
        return console.log(`${colors.lightgreen}[OK] ${message}${colors.reset}`)
    }

    /**
     * Sends the information log in the console.
     * @param message The message to send.
     */
    public info(message: string): void {
        return console.log(`${colors.lightblue}[I] ${message}${colors.reset}`)
    }

    /**
     * Sends the error log in the console.
     * @param message The message to send.
     */
    public error(message: string, exit = false): void {
        console.log(`${colors.lightred}[E] ${message}${colors.reset}`)

        if (exit) {
            process.exit(1)
        }

        return
    }

    /**
     * Sends the hint log in the console.
     * @param message The message to send.
     */
    public hint(message: string): void {
        return console.log(`${colors.lightcyan}[hint] ${message}${colors.reset}`)
    }

    /**
     * Sends the warn log in the console.
     * @param message The message to send.
     */
    public warn(message: string): void {
        return console.log(`${colors.lightyellow}[!] ${message}${colors.reset}`)
    }
}
