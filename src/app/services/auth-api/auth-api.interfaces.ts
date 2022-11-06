import { ApiError } from "../api.interfaces";

export enum SigninErrorCode {
    CredsInvalid = 'CREDENTIALS_INVALID'
}

export type SigninApiError = ApiError<SigninErrorCode>;

export enum SignupErrorCode {
    EmailInvalid = 'EMAIL_INVALID',
    UserExists = 'USER_EXISTS',
    PasswordInvalid = 'PASSWORD_INVALID',
}

export enum PasswordInvalidErrorCode {
    TooShort = 'PASSWORD_TOO_SHORT',
    TooLong = 'PASSWORD_TOO_LONG',
    ReqChars = 'NOT_ENOUGH_REQ_CHARS',
    InvalidChars = 'INVALID_CHARS',
}

export type PasswordInvalidError = {
    code: PasswordInvalidErrorCode.TooShort;
    minLength: number;
    providedLength: number;   
} | {
    code: PasswordInvalidErrorCode.TooLong;
    maxLength: number;
    providedLength: number;
} | {
    code: PasswordInvalidErrorCode.ReqChars;
    minimumAmount: number;
    providedAmount: number;
    characterCategory: string;
} | {
    code: PasswordInvalidErrorCode.InvalidChars;
    invalidCharacters: string;
};

export type SignupApiError =
    | ApiError<SignupErrorCode.EmailInvalid, { reason: string; }>
    | ApiError<SignupErrorCode.UserExists>
    | ApiError<SignupErrorCode.PasswordInvalid, PasswordInvalidError[]>;

export type AuthCreds = {
    email: string;
    password: string;
};