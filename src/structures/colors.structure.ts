export const colorCodePrefix = '\x1b['
export const colorCodeLength: 2 | 3 = 3
export const colorStringLength = colorCodePrefix.length + colorCodeLength

export const consoleColors = {
    black: colorCodePrefix + '30m',
    red: colorCodePrefix + '31m',
    green: colorCodePrefix + '32m',
    yellow: colorCodePrefix + '33m',
    blue: colorCodePrefix + '34m',
    magenta: colorCodePrefix + '35m',
    cyan: colorCodePrefix + '36m',
    lightgray: colorCodePrefix + '37m',
    default: colorCodePrefix + '39m',
    darkgray: colorCodePrefix + '90m',
    lightred: colorCodePrefix + '91m',
    lightgreen: colorCodePrefix + '92m',
    lightyellow: colorCodePrefix + '93m',
    lightblue: colorCodePrefix + '94m',
    lightmagenta: colorCodePrefix + '95m',
    lightcyan: colorCodePrefix + '96m',
    white: colorCodePrefix + '97m',
    reset: colorCodePrefix + '0m'
}
