// default local development auth callback url
let callbackUrl = "http://localhost:3000/callback"

// non local environment auth callback url
// this was setup by ejecting the config from react-create-app and updating config/env.js
if (process.env.AUTH0_URL) {
  callbackUrl = process.env.AUTH0_URL + '/callback'
}

export const AUTH_CONFIG = {
  domain: "viseo.auth0.com",
  clientId: "3VXiDHusndIjPa0C9AYCXxSizdbLnHwD",
  callbackUrl: callbackUrl 
};
