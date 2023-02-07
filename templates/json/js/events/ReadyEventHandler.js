const EventHandler = require('../core/EventHandler')

export default class ReadyEventHandler extends EventHandler {
    name = 'ready'

    async execute() {
        console.log(`The bot has logged in. Loaded ${this.client.commands.size} commands.`)
    }
}
