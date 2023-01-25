import { IOption, OptionName, ShortOptionName } from '../types/Option'
import { Logger } from './Logger.util'

const argv = process.argv.slice(2)
const commandOptions = argv as OptionName[] | ShortOptionName[]

export class CommandOptionsParser {
    public commandOptions: IOption[]
    public logger: Logger

    constructor(commandOptions: IOption[]) {
        this.commandOptions = commandOptions
        this.logger = new Logger()
    }

    public parse(): void {
        for (const commandOption of commandOptions) {
            console.log(commandOption)
        }
    }
}

// if option if invalid:

//  this.logger.error(`${commandOptions} - unknown option.`)
//  this.logger.hint('type "create-economy-bot --help" for help.')
