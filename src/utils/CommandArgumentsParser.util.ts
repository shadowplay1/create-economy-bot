import { Letters } from '../types/misc/Letters'
import { Logger } from './Logger.util'

const availableCommands: ICommand[] = [
    {
        name: '--help',
        shortName: '-h',
        args: {
            required: [],
            optional: ['command']
        },
        description: 'Displays the help message.'
    },

    {
        name: '--test',
        shortName: '-t',
        description: 'Test command'
    }
]

const args = process.argv.slice(2)

export class CommandArgumentsParser {
    public commands: ICommand[]
    public logger: Logger

    constructor (commands?: ICommand[]) {
        this.commands = commands || availableCommands
        this.logger = new Logger()
    }

    public parse(): void {
        for (const command of args) {
            // const [name, shortName] = (availableCommands.find(([name, shortName]) =>
            // name == command || shortName == command)) || []

            switch (command) {
            case '--help':
            case '-h':
                console.log(
                    'create-economy-bot help:\n\n' +
					availableCommands
					    .map(
					        ({ name, shortName, args, description }) =>
					            'create-economy-bot ' +
								`${name} (${shortName})${
								    args
								        ? `${args.required.map(arg => `<${arg}>`).join(' ')}` +
											`${args.optional.length ? ' ' : ''}` +

											`${args.optional.map(arg => `[${arg}]`).join(' ')}` +
											` - ${description}`
								        : ''
								}`
					    )
					    .join('\n')

                )

                break

            case '--test':
            case '-t':
				    console.log('test')
                break

            default:
                /*console.log(
						`${colors.lightred}${command}${colors.lightcyan} - unknown command.\n` +
						`${colors.lightyellow}type "create-economy-bot --help" for help.${colors.reset}`
					)*/

				   this.logger.error(`${command} - unknown command.`)
				   this.logger.hint('type "create-economy-bot --help" for help.')

                break
            }
        }
    }
}


// const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('') as const

type CommandLineName = `--${string}`
type ShortCommandLineName = `-${Letters}`

// type ICommand = [CommandLineArgument, ShortCommandLineArgument, string[], string]

// eslint-disable-next-line
interface ICommand {
	name: CommandLineName
	shortName: ShortCommandLineName
	args?: IArguments
	description: string
}

interface IArguments {
	required: string[]
	optional: string[]
}

