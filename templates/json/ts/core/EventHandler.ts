import DiscordClient from './DiscordClient'

export default abstract class EventHandler {
    public readonly name: string = ''

    constructor(protected readonly client: DiscordClient) {

    }

    abstract execute(...args: any): Promise<any>;
}
