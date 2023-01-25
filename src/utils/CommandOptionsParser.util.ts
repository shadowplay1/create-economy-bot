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
        let options: IOption[] = [...this.commandOptions]
        const commandArgument = args.length ? args.shift() : ''

        let optionsArg: string

        while (args.length) {
            optionsArg = args.shift() as string

            const option = options.find((opt) => {
                return opt.names.includes(optionsArg as any) || opt.shortNames.includes(optionsArg as any)
            })

            if (!option) {
                return this.logger.error(`Invalid option: ${optionsArg}`)
            }

            options = (option.options as IOption<string>[]) || []

            if (option.args) {
                const requiredArgs: string[] = []

                option.args.required.forEach(() => {
                    const arg = args.shift()

                    if (!arg) {
                        return this.logger.error(`Missing required argument for option: ${arg}`)
                    }

                    requiredArgs.push(arg)
                })

                option.value = args.shift()

                option?.execute({
                    argument: commandArgument,
                    options: args.length ? option.options && option.options.find(
                        opt =>
                            opt.names.includes(args[0] as OptionName) ||
                            opt.shortNames.includes(args[0] as ShortOptionName)
                    ) as any : []
                })
            } else {
                option.value = args.shift()

                option?.execute({
                    argument: commandArgument,
                    options: args.length ? option.options && option.options.find(
                        opt =>
                            opt.names.includes(args[0] as OptionName) ||
                            opt.shortNames.includes(args[0] as ShortOptionName)
                    ) as any : []
                })
            }
        }
    }
}
