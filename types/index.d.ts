// TypeScript Version: 3.1
//
// This file, and the overall project configuration, follow the steps and conventions defined at
// <https://github.com/Microsoft/dtslint#add-types-for-a-library-not-on-definitelytyped>.

import { VerifyCallback } from 'jsonwebtoken';

type AddUndefined<T> = { [P in keyof T]: T[P] | undefined };

declare namespace CognitoExpress {
    interface Config {
        cognitoUserPoolId: string;
        region: string;
        tokenExpiration: number;
        tokenUse: 'access' | 'id';
    }

    type InitCallback = (success: boolean) => void;

    // `VerifyCallback` is declaring both its `err` and `decoded` parameters as nonnullable, but
    // because it's a typical Node callback, only one or the other will be defined. So this type
    // decomposes `VerifyCallback`, declares its arguments as possibly undefined, and then
    // recomposes.
    type ValidateCallback = (
        ...args: AddUndefined<Parameters<VerifyCallback>>
    ) => ReturnType<VerifyCallback>;

    // The type of `VerifyCallback`'s `decoded` parameter.
    type ValidateResult = Parameters<VerifyCallback>[1];
}

declare class CognitoExpress {
    constructor(config: CognitoExpress.Config);

    init(callback: CognitoExpress.InitCallback): Promise<void>;

    validate(token: string | undefined): Promise<CognitoExpress.ValidateResult>;
    validate(token: string | undefined, callback: CognitoExpress.ValidateCallback): void;
}

export default CognitoExpress;
