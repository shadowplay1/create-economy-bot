export type ObjectKeys<T extends object> = keyof T
export type ObjectValues<T extends object> = T extends object ? T[keyof T] : never

export const keys = <T extends object>(obj: T): ObjectKeys<T>[] => {
    return Object.keys(obj) as any
}

export const values = <T extends object>(obj: T): ObjectValues<T>[] => {
    return Object.values(obj) as any
}

export const entries = <T extends object>(obj: T): [ObjectKeys<T>, ObjectValues<T>][] => {
    return Object.entries(obj) as any
}
