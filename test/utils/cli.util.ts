import { CLILogType, TypeInclusionStatus } from '../types/CLITest.interface'
import { objectKeys, objectEntries } from './misc/TypedObject.util'

import { colorStringLength } from '../../src/structures/colors.structure'

export const logPrefixTypes = {
    '[OK]': CLILogType.SUCCESS,
    '[I]': CLILogType.INFO,
    '[!]': CLILogType.WARN,
    '[E]': CLILogType.ERROR
}

/**
 * Gets the type of the finished command output.
 * @param stdout Command output to check.
 * @returns Output type.
 */
export const getLogType = (stdout: string): CLILogType => {

    // command outputs from this cli are always having a color
    // we are removing the color code with `.slice(...)`
    // so we could check the log prefixes, like [OK], [I], [E] and [!]
    //
    // also trimming the lines array with `.filter(...)`
    // to eliminate the blank lines in the output string
    const lastLogLine = stdout
        .split('\n')
        .filter(line => line)
        .at(-1)
        ?.slice(colorStringLength) as string

    const logPrefix = lastLogLine.split(' ')[0] as keyof typeof logPrefixTypes
    return logPrefixTypes[logPrefix] || CLILogType.NONE
}

/**
 * Is the specified log type included in specified command output.
 * @param logType Log type to check.
 * @param stdout Command output to check.
 * @returns Whether the log is in the output.
 */
export const isLogTypeIncluded = (logType: CLILogType, stdout: string): TypeInclusionStatus => {
    const prefixTypes = objectEntries(logPrefixTypes)

    for (const [prefix, prefixType] of prefixTypes) {
        if (logType == prefixType && stdout.includes(prefix)) {
            return TypeInclusionStatus.INCLUDED
        }
    }

    return TypeInclusionStatus.NOT_INCLUDED
}

/**
 * Is the specified output without any log prefixes (e.g. normal `console.log(...)` used).
 * @param stdout Command output to check.
 * @returns Whether there's no prefixes in the output.
 */
export const isDefaultLogged = (stdout: string): boolean => {
    const prefixes = objectKeys(logPrefixTypes)

    for (const prefix of prefixes) {
        if (stdout.includes(prefix)) {
            return false
        }
    }

    return true
}
