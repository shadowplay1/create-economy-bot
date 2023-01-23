import { ChatInputCommandInteraction } from 'discord.js'
import Command from '../../core/Command'
import CommandOptions from '../../types/ICommandOptions'

export default class HelloCommand extends Command {
    name = 'hello'
    category = 'testing'

    async execute({ messageInteraction }: CommandOptions<ChatInputCommandInteraction>) {
        messageInteraction.reply('Hello world!')
    }
}
