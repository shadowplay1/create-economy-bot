const Command = require('../../core/Command')

export default class HelloCommand extends Command {
    name = 'hello'
    category = 'testing'

    async execute({ messageInteraction }) {
        messageInteraction.reply('Hello world!')
    }
}
