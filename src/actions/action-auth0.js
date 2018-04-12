import {AUTH_CONFIG} from "../containers/user/containers/Auth/auth0-variables";
import auth0 from "auth0-js";

auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid"
});

const login = () => {
    this.auth0.authorize();
    return ({
        type: "AUTHORIZE"
    })
};

const handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
        if (err) return;
        // {
        //     alert(`Error: ${err.error}. Check the console for further details.`);
        //     return null;
        // }

        if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
        }
    });
};

const setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    // history.replace("/profile");
};

const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // navigate to the home route
    // history.replace("/");
};

const isAuthenticated= () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
};