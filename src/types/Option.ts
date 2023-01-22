import { Letters } from './misc/Letters'

export type OptionName = `--${string}`
export type ShortOptionName = `-${Letters}`

export interface IOption {

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
	 * Options that may be applied to the option.
	 */
	options?: IOption[]

	/**
	 * Executes the option.
	 * @param args Options to pass in the option.
	 */
	execute<T = any>(...options: T[]): any
}

export interface IArguments {
	required: string[]
	optional: string[]
}
