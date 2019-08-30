import { signup, verify, login, logout, getAuthToken } from './CognitoMethods';
import { getHelloWorld, postGraphQL } from './DataMethods';

class Api {
    public login = login;
    public signup = signup;
    public verify = verify;
    public logout = logout;
    public getAuthToken = getAuthToken;

    public getHelloWorld = () => this.getAuthToken().then(getHelloWorld);
    public postGraphQL = () => this.getAuthToken().then(postGraphQL);
}

export default new Api();
