import { IOption } from '../types/Option.interface'

const option: IOption = {
    names: ['--test'],
    shortNames: ['-t'],
    description: 'Test command',
    args: {
        required: ['reqarg1'],
        optional: []
    },
    options: [
        {
            names: ['--force'],
            shortNames: ['-f'],
            description: 'Force do something.'
        }
    ],
    execute(props): void {
        console.log('test')
        console.log(props)
    }
}

export default option
