import { IOption, OptionName, ShortOptionName } from '../types/Option.interface'
import { Logger } from './Logger.util'

export class CommandOptionsParser {
    public commandOptions: IOption[];
    public logger: Logger;

    constructor(commandOptions: IOption[]) {
        this.commandOptions = commandOptions;
        this.logger = new Logger();
    }

    public parse(args: string[]): void {
        let options: IOption[] = [...this.commandOptions];
		let argument = args.length ? args.shift() : '' // cli argument like `create-economy-bot my-bot`, to be refactored

		let arg: string // option argument, not cli argument, to be refactored

        while (args.length) {
            arg = args.shift()

            let option = options.find((opt) => {
                return opt.names.includes(arg as any) || opt.shortNames.includes(arg as any);
            })

            if (!option) {
                return this.logger.error(`Invalid option: ${arg}`)
            }

            options = option.options || []

            /* if (option.args) {
                const requiredArgs: string[] = []

                option.args.required.forEach(() => {
                    const arg = args.shift();

                    if (!arg) {
                        this.logger.error(`Missing required argument for option: ${arg}`);
                        return;
                    }

                    requiredArgs.push(arg);
                });

                option?.execute({ argument: requiredArgs[0] || null, options: option.options });
            } else {
                option?.execute({ argument: null, options: option.options });
            }*/


		   // const opts = args.length ? option.options && option.options.find(opt => opt.names.includes(args[0]) || opt.shortNames.includes(args[0])) : []

		   if (option.args) {
                const requiredArgs: string[] = [];

                option.args.required.forEach(() => {
                    const arg = args.shift();

                    if (!arg) {
                        return this.logger.error(`Missing required argument for option: ${arg}`)
                    }

                    requiredArgs.push(arg);
                })

             /*   option.execute({
					argument: requiredArgs[0] || string, 
					options: args.length ? option.options as IOption[] : [] 
				})
            } else {
                option.execute({ 
					argument: '', 
					options: args.length ? option.options : []
				});
            }
*/
  			    option.value = args.shift();

                option?.execute({
					argument: argument, // requiredArgs.length ? requiredArgs[0] : '', 
					options: args.length ? option.options && option.options.find(opt => opt.names.includes(args[0]) || opt.shortNames.includes(args[0])) : [] /*: option.options && option.options.find(
						opt => opt.names.includes(args[0]) || opt.shortNames.includes(args[0])
					)*/
				});
            } else {
                option.value = args.shift();

				option?.execute({
					argument,
					options: args.length ? option.options && option.options.find(opt => opt.names.includes(args[0]) || opt.shortNames.includes(args[0])) : [] /*: option.options && option.options.find(
						opt => opt.names.includes(args[0]) || opt.shortNames.includes(args[0])
					)*/
				});
        }
    }
	}

    private displayHelp(command: string): void {
        if (command) {
            const option = this.commandOptions.find((opt) => opt.names.includes(command as any) || opt.shortNames.includes(command as any));
            if (option) {
                this.logger.info(`Command: ${command}`);
                this.logger.info(`Description: ${option.description}`);
                if (option.args) {
                    if (option.args.required.length) {
                        this.logger.info(`Required arguments: ${option.args.required.join(', ')}`);
                    }
                    if (option.args.optional.length) {
                        this.logger.info(`Optional arguments: ${option.args.optional.join(', ')}`);
                    }
                }
                if (option.options && option.options.length) {
                    this.logger.info(`Possible options: ${option.options.map((opt) => opt.names[0]).join(', ')}`);
                }
            } else {
                this.logger.error(`Invalid command: ${command}`);
            }
        } else {
            this.logger.info('Available commands:');
			this.commandOptions.forEach((option) => {
                this.logger.info(`- ${option.names[0]}: ${option.description}`);
            });
        }
    }
}

