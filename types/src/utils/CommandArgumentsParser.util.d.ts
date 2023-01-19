import { Letters } from '../types/misc/Letters';
import { Logger } from './Logger.util';
export declare class CommandArgumentsParser {
    commands: ICommand[];
    logger: Logger;
    constructor(commands?: ICommand[]);
    parse(): void;
}
type CommandLineName = `--${string}`;
type ShortCommandLineName = `-${Letters}`;
interface ICommand {
    name: CommandLineName;
    shortName: ShortCommandLineName;
    args?: IArguments;
    description: string;
}
interface IArguments {
    required: string[];
    optional: string[];
}
export {};
