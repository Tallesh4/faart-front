export interface PasswordResetInterface {
    id: string,
    token: string,
    expireAt: Date,
    code?: string,
    userEmail: string
}