import { IOption, OptionName, ShortOptionName } from '../types/Option.interface'
import { Logger } from './Logger.util'

import { log as l } from 'console'

export class CommandOptionsParser {
    public commandOptions: IOption[]
    public logger: Logger

    constructor(commandOptions: IOption[]) {
        this.commandOptions = commandOptions
        this.logger = new Logger()
    }

    public parse(args: string[]): void {
        l(1)

        const options: IOption[] = [...this.commandOptions]
        const commandArgument = args.length ? args.shift() : ''

        let optionsArg: string

        l(2)
        l({ args })

        while (args.length) {
            l(3)

            optionsArg = args.shift() as string

            const option = options.find((opt) => {
                return opt.names.includes(optionsArg as any) || opt.shortNames.includes(optionsArg as any)
            })

            /*
            if (!option) {
                return this.logger.error(`Invalid option: ${optionsArg}`)
            }*/

		    if (!option) {
                this.logger.info('Test info.')
                this.logger.warn('Test warn.')
                // this.logger.hint('Test hint.')

                return this.logger.error(`Invalid option: ${optionsArg}`)
            }

            if (option.args && option.args.required && !args.length) {
                return this.logger.error(`Missing required argument for option: ${optionsArg}`)
            }


            l(4)

            // options = (option.options as IOption<string>[]) || []

            if (option.args) {

                l(5)

                const requiredArgs: string[] = []

                option.args.required.forEach(() => {
                    const arg = args.shift()

                    if (!arg) {
                        return this.logger.error(`Missing required argument for option: ${arg}`)
                    }

                    requiredArgs.push(arg)
                })

                l(6)

                // option.value = args.shift()

                l(7)

                option?.execute({
                    argument: commandArgument,
                    options: args.length ? option.options && option.options.find(
                        opt =>
                            opt.names.includes(args[1] as OptionName) ||
                            opt.shortNames.includes(args[1] as ShortOptionName)
                    ) as any : []
                })

                option.value = args.shift()

                l(8)
            } else {
                l(11)

                // option.value = args.shift()

                l(22)

                option?.execute({
                    argument: commandArgument,
                    options: args.length ? option.options && option.options.find(
                        opt =>
                            opt.names.includes(args[1] as OptionName) ||
                            opt.shortNames.includes(args[1] as ShortOptionName)
                    ) as any : []
                })

                option.value = args.shift()

                l(33)
            }
        }
    }
}
