import { signup, verify, login, logout, getAuthToken } from './CognitoMethods';

class Api {
    public login = login;
    public signup = signup;
    public verify = verify;
    public logout = logout;
    public getAuthToken = getAuthToken;
}

export default new Api();
