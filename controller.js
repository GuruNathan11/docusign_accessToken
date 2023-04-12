const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/', (req, res) => {
  service.redirectToAuthorizationEndpoint(req, res);
});

router.get('/ds/callback', async (req, res) => {
  const authorizationCode = req.query.code;
  try {
    const accessToken = await service.getAccessToken(authorizationCode);
    res.send(`Access token: ${accessToken}`);
    // console.log("guru",accessToken);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

module.exports = router;
