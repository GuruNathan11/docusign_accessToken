const axios = require('axios');
const qs = require('qs');
const dao = require('./dao');

const clientId = '3488934a-c517-45ca-8533-e24f1b61fb9a';
const clientSecret = '209a3d46-9fb6-4b4c-8cee-2478b6884022';
const redirectUri = 'http://localhost:3000/ds/callback';
const authorizationEndpoint = 'https://account-d.docusign.com/oauth/auth';
const tokenEndpoint = 'https://account-d.docusign.com/oauth/token';

const redirectToAuthorizationEndpoint = (req, res) => {
  const authUrl = `${authorizationEndpoint}?response_type=code&scope=signature&client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
};

const getAccessToken = async (authorizationCode) => {
  const response = await axios.post(
    tokenEndpoint,
    qs.stringify({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'signature'
    })
  );
  const accessToken = response.data.access_token;
  await dao.saveAccessToken(accessToken); // save access token to database for future use
  return accessToken;
};

module.exports = {
  redirectToAuthorizationEndpoint,
  getAccessToken,
};

