import { signup, verify, login, logout, getAuthToken } from './CognitoMethods';
import { getHelloWorld } from './DataMethods';

class Api {
    public login = login;
    public signup = signup;
    public verify = verify;
    public logout = logout;
    public getAuthToken = getAuthToken;

    public getHelloWorld = () =>
        this.getAuthToken().then(token => getHelloWorld(token));
}

export default new Api();
