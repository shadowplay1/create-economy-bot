import { readdirSync } from 'fs'

import { IOption, OptionName, ShortOptionName } from './types/Option.interface'
import { CommandOptionsParser } from './utils/CommandOptionsParser.util'

const processArgv = process.argv.slice(2)
const args = processArgv as OptionName[] | ShortOptionName[]

const main = async (): Promise<void> => {
    const options: IOption[] = []
    const optionsFiles = readdirSync(__dirname + '/options')

    for (const optionsFile of optionsFiles) {
        const optionsObject = await import(__dirname + `/options/${optionsFile}`)
        options.push(optionsObject.default)
    }

    const optionsParser = new CommandOptionsParser(options)
    optionsParser.parse(args)
}

main()
