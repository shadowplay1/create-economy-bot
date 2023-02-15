import { readdirSync } from 'fs'

import { name as cliName, version as cliVersion } from '../../package.json'
import { IOption } from '../types/Option.interface'

const option: IOption = {
    names: ['--help'],
    shortNames: ['-h'],
    args: {
        required: [],
        optional: ['command']
    },
    description: 'Displays the help message.',

    async execute(): Promise<void> {
        const options: IOption[] = []
        const optionsFiles = readdirSync('./options')

        for (const optionsFile of optionsFiles) {
            const optionsObject = await import(`./${optionsFile}`)
            options.push(optionsObject.default)
        }

        const optionsHelp = options.map(
            ({ names, shortNames, args, description }) =>
                '  ' +
                        `${names.join(', ')} (${shortNames.join(', ')})${args ?
                            ` ${args?.required?.map(arg => `<${arg}>`).join(' ')}` +
                            //`${args?.optional?.length ? ' ' : ''} ` +

                            `${args?.optional?.map(arg => `[${arg}]`).join(' ')}` +
                            ` - ${description}`
                            : ''
                        }`
        ).join('\n')

        console.log(`${cliName} v${cliVersion} - cli help\n`)

        console.log(`usage: ${cliName} [options]`)
        console.log(optionsHelp)
    },
}

export default option
