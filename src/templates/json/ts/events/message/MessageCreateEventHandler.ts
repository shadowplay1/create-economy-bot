import { Message } from 'discord.js'
import EventHandler from '../../core/EventHandler'

export default class MessageCreateEventHandler extends EventHandler {
    name = 'messageCreate'

    async execute(message: Message): Promise<any> {
        if (message.author.bot || !message.content) {
            return
        }

        if (!message.content.startsWith(this.client.prefix)) {
            return
        }

        const [commandName, ...args] = message.content.slice(this.client.prefix.length).split(/ +/)
        const command = this.client.commands.get(commandName)

        if (command) {
            command.run({
                commandName,
                messageInteraction: message,
                message,
                messageArgs: args,
                messageArgv: [commandName, ...args]
            }).catch(() => {
                console.error(`Error while running command: "${command.name}" ("${commandName}")`)
            })
        }
    }
}
