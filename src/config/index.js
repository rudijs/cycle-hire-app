import auth0 from "auth0-js";

// default local development auth callback url
let callbackUrl = "http://localhost:3000/auth/callback";

const AUTH_CONFIG = {
    domain: "viseo.auth0.com",
    clientId: "3VXiDHusndIjPa0C9AYCXxSizdbLnHwD",
    callbackUrl: callbackUrl
};

const Auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid"
});

export default Auth0;