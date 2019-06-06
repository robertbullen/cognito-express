import CognitoExpress from 'cognito-express';

//
// CognitoExpress.constructor()
//

new CognitoExpress(); // $ExpectError

new CognitoExpress({}); // $ExpectError

// If this statement is wrapped over multiple lines, dtslint will fail because different versions
// of the compiler identify errors on different lines.
// prettier-ignore
new CognitoExpress({ region: 'us-east-1', cognitoUserPoolId: 'us-east-1_dXlFef73t', tokenUse: 'refresh', tokenExpiration: '3600000' }); // $ExpectError

const cognitoExpress = new CognitoExpress({
    region: 'us-east-1',
    cognitoUserPoolId: 'us-east-1_dXlFef73t',
    tokenUse: 'access',
    tokenExpiration: 3600000,
});

//
// CognitoExpress.init()
//

cognitoExpress.init(); // $ExpectError

const initCallback: CognitoExpress.InitCallback = (result: boolean): void => console.log(result);
cognitoExpress.init(initCallback); // $ExpectType Promise<void>

//
// CognitoExpress.validate()
//

const token = 'token';
const validateCallback: CognitoExpress.ValidateCallback = (
    error?: CognitoExpress.ValidateError,
    result?: CognitoExpress.ValidateResult,
): void => console.log(error, result);

cognitoExpress.validate(); // $ExpectError
cognitoExpress.validate(validateCallback); // $ExpectError
cognitoExpress.validate(validateCallback, token); // $ExpectError

cognitoExpress.validate(token); // $ExpectType Promise<ValidateResult>
cognitoExpress.validate(token, validateCallback); // $ExpectType void
