import { IOption } from './types/Option'
import { CommandOptionsParser } from './utils/CommandOptionsParser.util'

const options: IOption[] = [
    {
        names: ['--help'],
        shortNames: ['-h'],
        args: {
            required: [],
            optional: ['command']
        },
        description: 'Displays the help message.',

        execute(): void {
            console.log(
                options.map(
                    ({ names, shortNames, args, description }) =>
                        'create-economy-bot ' +
                        `${names.join(', ')} (${shortNames.join(', ')})${args ?
                            `${args.required.map(arg => `<${arg}>`).join(' ')}` +
                            `${args.optional.length ? ' ' : ''}` +

                            `${args.optional.map(arg => `[${arg}]`).join(' ')}` +
                            ` - ${description}`
                            : ''
                        }`
                ).join('\n')
            )
        },
    },

    {
        names: ['--test'],
        shortNames: ['-t'],
        description: 'Test command',

        execute(): void {
            console.log('test')
        }
    }
]


export const main = async (): Promise<void> => {
    const optionsParser = new CommandOptionsParser(options)
    optionsParser.parse()
}

// throw new Error('The package is not ready yet. Come back later when it\'s ready!')
