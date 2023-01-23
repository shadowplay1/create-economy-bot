import { Client, Collection, ClientOptions as DiscordClientOptions } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import Command from './Command';

export interface ClientOptions extends DiscordClientOptions {
    autoBoot?: boolean;
}

export default class DiscordClient extends Client {
    public readonly commands = new Collection<string, Command>();
    public readonly commandsPath = path.resolve(__dirname, '..', 'commands');
    public readonly eventHandersPath = path.resolve(__dirname, '..', 'events');
    public readonly prefix = '!';

    constructor(options: ClientOptions) {
        super(options);

        if ((options.autoBoot ?? true))
            this.boot().then(() => console.log("The client has booted")).catch(console.error);
    }

    async boot() {
        await this.loadCommands(this.commandsPath);
        console.log("Loaded commands successfully");
        await this.loadEventHandlers(this.eventHandersPath);
        console.log("Loaded event handlers successfully");
    }

    async loadCommands(directory = '.') {
        const files = await fs.readdir(directory);

        for await (const file of files) {
            if ((await fs.lstat(path.resolve(directory, file))).isDirectory()) {
                await this.loadCommands(path.resolve(directory, file));
                continue;
            }

            if (file.endsWith('.js') || file.endsWith('.ts')) {
                const { default: Command } = await import(path.resolve(directory, file));
                const command = new Command(this);

                this.commands.set(command.name, command);

                for (const alias of command.aliases) {
                    this.commands.set(alias, command);
                }
            }
        }
    }

    async loadEventHandlers(directory = '.') {
        const files = await fs.readdir(directory);
        console.log(files);

        for await (const file of files) {
            if ((await fs.lstat(path.resolve(directory, file))).isDirectory()) {
                console.log("redirect");
                await this.loadEventHandlers(path.resolve(directory, file));
                continue;
            }

            if (file.endsWith('.js') || file.endsWith('.ts')) {
                const { default: EventHandler } = await import(path.resolve(directory, file));
                const eventHandler = new EventHandler(this);
                console.log(eventHandler.name);
                this.on(eventHandler.name, (...args: any) => eventHandler.execute(...args));
            }
        }
    }
}
