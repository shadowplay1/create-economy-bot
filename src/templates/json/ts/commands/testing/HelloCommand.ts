import { ChatInputCommandInteraction } from "discord.js";
import Command from "../../core/Command";
import CommandOptions from "../../types/CommandOptions";

export default class HelloCommand extends Command {
    name = "hello";
    category = "testing";

    async execute({ messageInteraction }: CommandOptions<ChatInputCommandInteraction>) {
        messageInteraction.reply("Hello world!");
    }
}