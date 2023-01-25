import { exec } from 'child_process'

export const executeCommand = (command: string) => {
    console.log(command, exec)
}
