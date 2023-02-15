import { Logger } from '../utils/Logger.util'
import { Letters } from './misc/Letters.type'

export type OptionName = `--${string}` | `--${string} ${string}`
export type ShortOptionName = `-${Letters}` | `-${Letters} ${string}`

export interface IOption<T extends string | number | boolean = string> {

	/**
	 * Full option name (will be used like --this).
	 */
	names: OptionName[]

	/**
	 * Shorthand for the full option name (will be used like this: -t)
	 */
	shortNames: ShortOptionName[]

	/**
	 * Option arguments.
	 */
	args?: IArguments

	/**
	 * Option description.
	 */
	description: string

	/**
	 * Option argument (like `--template my-template`, "my-template" is an option argument)
	 */
	value?: T

	/**
	 * Options that may be applied to the option.
	 */
	options?: Omit<IOption<T>, 'options' | 'execute'>[]

	/**
	 * Executes the option.
	 * @param args Options to pass in the option.
	 */
	execute<T extends string | number | boolean = string>(props: IOptionProps<T>, logger: typeof Logger): any
}

export interface IArguments {
	required?: string[]
	optional?: string[]
}

export interface IOptionProps<T extends string | number | boolean = string> {
	argument?: string
	options: Omit<IOption<T>, 'options' | 'execute'>[]
}
