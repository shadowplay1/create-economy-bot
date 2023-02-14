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
        const commandArgument = (args.length ? optionArgs.shift() : '') as OptionName | ShortOptionName

        let tempOptionsArg: string

        while (optionArgs.length) {
            let optionValue: string | undefined
            tempOptionsArg = optionArgs.shift() as string

            if (commandArgument.startsWith('-')) {
                const option = options.find(opt =>
                    opt.names.includes(commandArgument as OptionName) ||
						opt.shortNames.includes(commandArgument as ShortOptionName)
                )

                if (!option) {
                    return this.logger.error(`Invalid option: ${commandArgument}`)
                }

                try {
                    const exactOptionValue = JSON.parse(tempOptionsArg)
                    optionValue = exactOptionValue
                } catch {
                    optionValue = tempOptionsArg
                }

                console.log('in loop:', { args, optionArgs, tempOptionsArg, commandArgument, optionValue })

                option.value = optionValue
                option?.execute({
                    argument: optionValue,
                    options: optionArgs.length
                        ? options.filter(opt =>
                            opt.names.includes(optionArgs[0] as OptionName) ||
								opt.shortNames.includes(optionArgs[0] as ShortOptionName)
                        )
                        : [],
                })
            } else {
                if (!options.find((opt) => opt.args?.required)) {
                    return this.logger.error(`Unexpected argument: ${tempOptionsArg}`)
                }

                optionValue = tempOptionsArg
            }
        }

        if (!(args.length - 1) && commandArgument) {
            const option = options.find(opt => {
                return opt.names.includes(commandArgument as any) || opt.shortNames.includes(commandArgument as any)
            })

            option?.execute({
                argument: '',
                options: []
            })
        }
    }
}

