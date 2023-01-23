import { Message, Interaction } from 'discord.js'

export default interface ICommandOptions<TInteraction = Interaction> {
    message?: Message;
    interaction?: TInteraction;
    messageInteraction: Message | TInteraction;
    messageArgv?: string[];
    messageArgs?: string[];
    commandName: string;
}
