// TypeScript Version: 2.3
//
// This file, and the overall project configuration, follow the steps and conventions defined at
// <https://github.com/Microsoft/dtslint#add-types-for-a-library-not-on-definitelytyped>.

import { VerifyCallback, VerifyErrors } from 'jsonwebtoken';

type AddUndefined<T> = { [P in keyof T]: T[P] | undefined };

declare namespace CognitoExpress {
    interface Config {
        cognitoUserPoolId: string;
        region: string;
        tokenExpiration: number;
        tokenUse: 'access' | 'id';
    }

    type InitCallback = (success: boolean) => void;

    // This type is base on jsonwebtokens' VerifyErrors, but cognito-express also adds to that the
    // possibility of a `string` error.
    type ValidateError = VerifyErrors | string;

    // This type is the same as jsonwebtoken's VerifyCallback`'s `decoded` parameter.
    type ValidateResult = string | object;

    // This signature is based on jsonwebtoken's `VerifyCallback`, but declares its parameters as
    // possibly undefined because it adheres to the Node callback convention of only one or the
    // other will be defined.
    type ValidateCallback = (error?: ValidateError, result?: ValidateResult) => void;
}

declare class CognitoExpress {
    constructor(config: CognitoExpress.Config);

    init(callback: CognitoExpress.InitCallback): Promise<void>;

    validate(token: string | undefined): Promise<CognitoExpress.ValidateResult>;
    validate(token: string | undefined, callback: CognitoExpress.ValidateCallback): void;
}

export default CognitoExpress;
