
import Auth0, { AUTH_CONFIG }  from "../../config";

export default class Auth {

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        Auth0.authorize({
            redirectUri: AUTH_CONFIG.callbackUrl,
            audience: `https://${AUTH_CONFIG.domain}/userinfo`,
            responseType: "token id_token",
            scope: "openid"
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
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }
}