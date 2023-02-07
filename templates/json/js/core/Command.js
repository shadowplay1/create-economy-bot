const DiscordClient = require('./DiscordClient')

export default class Command {
    name = ''
    category = ''
    aliases = []

    constructor(client) {
        this.client = client;
    }

    execute(options) {}

    async run(options) {
        return this.execute(options)
    }
}
