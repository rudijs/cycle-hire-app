
import Auth0, { AUTH_CONFIG }  from "../../config";

export default class Auth {

    scope = "openid profile email user_metadata read:users read write metadata";
    connection = {
        usernamePasswordAuthentication: "Username-Password-Authentication"
    };

    authorization = `Bearer ${AUTH_CONFIG.token}`;
    api_endpoint = AUTH_CONFIG.endpoint;

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    loginWithCredentials = ({ username, password}) => {
        console.log('sdfsfsdf');
        Auth0.redirect.loginWithCredentials({
            connection: this.connection.usernamePasswordAuthentication,
            username,
            password,
            scope: this.scope
        }, (err) => console.log(err));
    };

    // causes error
    signup = ({ email, password, user_metadata }) => {
        Auth0.signup({
            connection: this.connection.usernamePasswordAuthentication,
            email,
            password,
            user_metadata
        }, (err) => {
            if(err) console.log(err);
            console.log('success')
        });
    };

    login() {
        Auth0.authorize({
            redirectUri: AUTH_CONFIG.callbackUrl,
            audience: `https://${AUTH_CONFIG.domain}/userinfo`,
            responseType: "token id_token",
            scope: this.scope
        });
    }

    checkPermission = ({ location }) => {
        if (/access_token|id_token|error/.test(location.hash)) {
            return this.handleAuthentication();
        }
    };

    handleAuthentication = () => new Promise((resolve, reject) =>
        Auth0.parseHash((err, authResult) => {
            if(err) reject(err);
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                resolve(authResult);
            }
        })
    );

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("profile", JSON.stringify(authResult.idTokenPayload));
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
    }

    setCustomSession = ({ profile, lock}) => {
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("lock", JSON.stringify(lock));
    };

    logout = () => localStorage.clear();

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let lock = JSON.parse(localStorage.getItem("lock"));

        if(lock && lock === true) {
            return true
        } else {
            let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
            return new Date().getTime() < expiresAt;
        }
    }
}