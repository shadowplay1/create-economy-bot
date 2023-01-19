"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandArgumentsParser = void 0;
const Logger_util_1 = require("./Logger.util");
const availableCommands = [
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
];
const args = process.argv.slice(2);
class CommandArgumentsParser {
    commands;
    logger;
    constructor(commands) {
        this.commands = commands || availableCommands;
        this.logger = new Logger_util_1.Logger();
    }
    parse() {
        for (const command of args) {
            // const [name, shortName] = (availableCommands.find(([name, shortName]) =>
            // name == command || shortName == command)) || []
            switch (command) {
                case '--help':
                case '-h':
                    console.log('create-economy-bot help:\n\n' +
                        availableCommands
                            .map(({ name, shortName, args, description }) => 'create-economy-bot ' +
                            `${name} (${shortName})${args
                                ? `${args.required.map(arg => `<${arg}>`).join(' ')}` +
                                    `${args.optional.length ? ' ' : ''}` +
                                    `${args.optional.map(arg => `[${arg}]`).join(' ')}` +
                                    ` - ${description}`
                                : ''}`)
                            .join('\n'));
                    break;
                case '--test':
                case '-t':
                    console.log('test');
                    break;
                default:
                    /*console.log(
                            `${colors.lightred}${command}${colors.lightcyan} - unknown command.\n` +
                            `${colors.lightyellow}type "create-economy-bot --help" for help.${colors.reset}`
                        )*/
                    this.logger.error(`${command} - unknown command.`);
                    this.logger.hint('type "create-economy-bot --help" for help.');
                    break;
            }
        }
    }
}
exports.CommandArgumentsParser = CommandArgumentsParser;
//# sourceMappingURL=CommandArgumentsParser.util.js.map