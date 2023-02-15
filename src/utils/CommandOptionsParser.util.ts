import { IOption, OptionName, ShortOptionName } from '../types/Option.interface'
import { Logger } from './Logger.util'

export class CommandOptionsParser {
    public commandOptions: IOption[]
    public logger: Logger

    constructor(commandOptions: IOption[]) {
        this.commandOptions = commandOptions
        this.logger = new Logger()
    }

    public parse(args: string[]): void {
        const options: IOption[] = [...this.commandOptions]

        const optionArgs = [...args] as OptionName[] | ShortOptionName[]
        const executedOptions: IOption[] = []

        let tempOptionsArg: string

        while (optionArgs.length) {
            let optionValue: string | undefined
            const commandArgument = optionArgs.shift() as OptionName | ShortOptionName

            if (commandArgument.startsWith('-')) {
                const option = options.find(opt =>
                    opt.names.includes(commandArgument as OptionName) ||
                    opt.shortNames.includes(commandArgument as ShortOptionName)
                )

                if (!option) {
                    return this.logger.error(`Invalid option: ${commandArgument}`)
                }

                executedOptions.push(option)

                if (option.args?.required) {
                    tempOptionsArg = optionArgs.shift() as string

                    try {
                        const exactOptionValue = JSON.parse(tempOptionsArg)
                        optionValue = exactOptionValue
                    } catch {
                        optionValue = tempOptionsArg
                    }

                    option.value = optionValue
                }

                option.execute({
                    argument: optionValue,
                    options: executedOptions,
                }, this.logger)
            } else {
                if (!options.find(opt => opt.args?.required)) {
                    return this.logger.error(`Unexpected argument: ${commandArgument}`)
                }

                optionValue = commandArgument
            }
        }

        options.forEach(opt => {
            if (!executedOptions.includes(opt) && opt.args?.required) {
                return this.logger.error(`Required option "${opt.names[0]}" is missing`)
            }
        })
    }
}

