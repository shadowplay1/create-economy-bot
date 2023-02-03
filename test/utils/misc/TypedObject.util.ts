export type ObjectKeys<T extends object> = NonNullable<keyof T>
export type ObjectValues<T extends object> = NonNullable<T> extends object ? NonNullable<T>[NonNullable<keyof T>] : never

export const objectKeys = <T extends object>(obj: T): ObjectKeys<T>[] => {
    return Object.keys(obj) as any
}

export const objectValues = <T extends object>(obj: T): ObjectValues<T>[] => {
    return Object.values(obj) as any
}

export const objectEntries = <T extends object>(obj: T): [ObjectKeys<T>, ObjectValues<T>][] => {
    return Object.entries(obj) as any
}
