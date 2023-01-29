export interface ITestFactory {
    toSucceed(): any
    toError(): any
    toSendInfo(): any
}
