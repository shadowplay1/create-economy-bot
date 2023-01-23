import CommandOptions from "../types/CommandOptions";
import DiscordClient from "./DiscordClient";

export default abstract class Command {
    public readonly name: string = '';
    public readonly category: string = '';
    public readonly aliases: string[] = [];

    constructor(protected readonly client: DiscordClient) {
        
    }

    abstract execute(options: CommandOptions): Promise<any>;

    async run(options: CommandOptions) {
        return await this.execute(options);
    }
}