import CognitoExpress from 'cognito-express';
import { VerifyErrors } from 'jsonwebtoken';

//
// CognitoExpress.constructor()
//

new CognitoExpress(); // $ExpectError

new CognitoExpress({}); // $ExpectError

new CognitoExpress({
    region: 'us-east-1',
    cognitoUserPoolId: 'us-east-1_dXlFef73t',
    tokenUse: 'refresh', // $ExpectError
    tokenExpiration: '3600000', // $ExpectError
});

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
    error: VerifyErrors | undefined,
    decoded: string | object | undefined,
): void => console.log(error, decoded);

cognitoExpress.validate(); // $ExpectError
cognitoExpress.validate(validateCallback); // $ExpectError
cognitoExpress.validate(validateCallback, token); // $ExpectError

cognitoExpress.validate(token); // $ExpectType Promise<string | object>
cognitoExpress.validate(token, validateCallback); // $ExpectType void
