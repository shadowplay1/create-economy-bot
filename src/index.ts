import { IOption, OptionName, ShortOptionName } from './types/Option.interface'
import { CommandOptionsParser } from './utils/CommandOptionsParser.util'

const processArgv = process.argv.slice(2)
const args = processArgv as OptionName[] | ShortOptionName[]

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
                            `${args?.required?.map(arg => `<${arg}>`).join(' ')}` +
                            `${args?.optional?.length ? ' ' : ''} ` +

                            `${args?.optional?.map(arg => `[${arg}]`).join(' ')}` +
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
        args: {
            required: ['reqarg1'],
            optional: []
        },
        options: [
            {
                names: ['--force'],
                shortNames: ['-f'],
                description: 'Force do something.'
            }
        ],
        execute(props): void {
            console.log('test')
            console.log(props)
        }
    }
]


const main = async (): Promise<void> => {
    const optionsParser = new CommandOptionsParser(options)
    optionsParser.parse(args)
}

main()
