import { consoleColors as colors } from '../structures/colors.structure'

export class Logger {
    public info(message: string): void {
        return console.log(`${colors.lightblue}[I] ${message}${colors.reset}`)
    }

    public error(message: string): void {
        return console.log(`${colors.lightred} [E] ${message}${colors.reset}`)
    }

    public hint(message: string): void {
        return console.log(`${colors.cyan}[hint] ${message}${colors.reset}`)
    }

    public warn(message: string): void {
        return console.log(`${colors.lightyellow}${message}${colors.reset}`)
    }
}

