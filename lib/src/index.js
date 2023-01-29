"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandOptionsParser_util_1 = require("./utils/CommandOptionsParser.util");
const processArgv = process.argv.slice(2);
const args = processArgv;
const options = [
    {
        names: ['--help'],
        shortNames: ['-h'],
        args: {
            required: [],
            optional: ['command']
        },
        description: 'Displays the help message.',
        execute() {
            console.log(options.map(({ names, shortNames, args, description }) => 'create-economy-bot ' +
                `${names.join(', ')} (${shortNames.join(', ')})${args ?
                    `${args.required.map(arg => `<${arg}>`).join(' ')}` +
                        `${args.optional.length ? ' ' : ''} ` +
                        `${args.optional.map(arg => `[${arg}]`).join(' ')}` +
                        ` - ${description}`
                    : ''}`).join('\n'));
        },
    },
    {
        names: ['--test'],
        shortNames: ['-t'],
        description: 'Test command',
        args: {
            required: ['reqarg1'],
            optional: ['optarg1']
        },
        options: [
            {
                names: ['--force'],
                shortNames: ['-f'],
                description: 'Force do something.'
            }
        ],
        execute(props) {
            console.log('test');
            console.log(props);
        }
    }
];
const main = async () => {
    console.log(123);
    const optionsParser = new CommandOptionsParser_util_1.CommandOptionsParser(options);
    optionsParser.parse(args);
};
main();
//# sourceMappingURL=index.js.map