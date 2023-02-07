const DiscordClient = require('./DiscordClient')

export default class EventHandler {
    name = ''

    constructor(client) {
        this.client = client
    }

    execute(...args) {}
}
