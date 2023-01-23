import EventHandler from "../core/EventHandler";

export default class ReadyEventHandler extends EventHandler {
    name = "ready";

    async execute(): Promise<any> {
        console.log(`The bot has logged in. Loaded ${this.client.commands.size} commands.`);
    }
}