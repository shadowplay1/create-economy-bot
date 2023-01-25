import { consoleColors as colors } from '../structures/colors.structure'

export class Logger {
    public info(message: string): void {
        return console.log(`${colors.lightblue}[I] ${message}${colors.reset}`)
    }

    public error(message: string, exit: boolean = false): void {
		console.log(`${colors.lightred}[E] ${message}${colors.reset}`)

		if (exit) {
			process.exit(1)
		}

		return
    }

    public hint(message: string): void {
        return console.log(`${colors.lightcyan}[hint] ${message}${colors.reset}`)
    }

    public warn(message: string): void {
        return console.log(`${colors.lightyellow}[!] ${message}${colors.reset}`)
    }
}

