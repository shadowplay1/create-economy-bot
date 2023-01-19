import { Logger } from './utils/Logger.util'

const availableCommands: AvailableCommand[] = [
    ['--help', '-h', ['[command]'], 'Displays the help message.'],
    ['--test', '-t', [], 'Test command.']
]

const args = process.argv.slice(2)

export class CommandArgumentsParser {
    public commands: AvailableCommand[]
    public logger: Logger

    constructor (commands: AvailableCommand[]) {
        this.commands = commands
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
					        ([name, shortName, usage, description]) =>
					            'create-economy-bot ' +
								`${name} (${shortName})${usage.length ? ' ' + usage.join(' ') : ''} - ${description}`
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


const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('') as const

type CommandLineName = `--${string}`
type ShortCommandLineName = `-${typeof letters}`

// type AvailableCommand = [CommandLineArgument, ShortCommandLineArgument, string[], string]

// eslint-disable-next-line
interface ICommand {
	name: CommandLineName
	shortName: ShortCommandLineName
	args: Arguments
}

// eslint-disable-next-line
interface IArguments {
	required: string[]
	optional: string[]
}
