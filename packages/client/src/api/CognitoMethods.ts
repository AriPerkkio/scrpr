import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession,
    ISignUpResult,
} from 'amazon-cognito-identity-js';

import config from 'scrpr-api/cf-api.json';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient,
});

const User = (email: string): CognitoUser =>
    new CognitoUser({
        Username: email,
        Pool: userPool,
    });

const LoginData = (email: string, password: string): AuthenticationDetails =>
    new AuthenticationDetails({
        Username: email,
        Password: password,
    });

const resultHandler = <T>(
    resolve: (data: T) => void,
    reject: (error: Error | undefined) => void
): ((error: Error | undefined, result: T) => void) => (
    error: Error | undefined,
    result: T
): void => (error ? reject(error) : resolve(result));

const verify = (email: string, verificationCode: string): Promise<void> =>
    new Promise((resolve, reject) => {
        const user = User(email);
        const handler = resultHandler(resolve, reject);

        user.confirmRegistration(verificationCode, true, handler);
    });

const signup = (email: string, password: string): Promise<ISignUpResult> =>
    new Promise((resolve, reject) => {
        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: email }),
        ];
        const handler = resultHandler(resolve, reject);

        userPool.signUp(email, password, attributeList, [], handler);
    });

const login = (email: string, password: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const user = User(email);
        const loginData = LoginData(email, password);

        user.authenticateUser(loginData, {
            onFailure: reject,
            onSuccess: result => resolve(result.getIdToken().getJwtToken()),
        });
    });

const logout = (): void => {
    const user = userPool.getCurrentUser();
    user && user.signOut();
};

const getAuthToken = (): Promise<string> =>
    new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();

        if (user != null) {
            user.getSession((err: Error, session: CognitoUserSession) => {
                if (err || !session || !session.isValid()) {
                    reject();
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            reject();
        }
    });

export { signup, verify, login, logout, getAuthToken };
