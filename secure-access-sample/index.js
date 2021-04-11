const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { frontegg, FronteggPermissions, withAuthentication } = require('@frontegg/client');
var fs = require('fs');

var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('selfsigned.key', 'utf8');
var certificate = fs.readFileSync('selfsigned.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

const clientId = process.env.FRONTEGG_CLIENT_ID;
const apiKey = process.env.FRONTEGG_API_KEY;

const tenantId = 'my-tenant-id';
const userId = 'my-user-id';


const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/shift', withAuthentication());
app.use('/admins', withAuthentication({ roles: ['admin'] }));

app.use('/frontegg', frontegg({
  clientId,
  apiKey,
  authMiddleware: withAuthentication(),
  contextResolver: async (req) => {
    const permissions = [
      FronteggPermissions.All,
    ];

    return {
      tenantId: req.user ? req.user.tenantId : 'invalid-tenant-id',
      userId: req.user ? req.user.id : null,
      permissions
    }
  }
}));

app.post('/auth/saml/callback', (req, res) => {
  console.log('got to saml callback');
  res.redirect(`http://localhost:3000/auth/saml/callback?SAMLResponse=${encodeURIComponent(req.body.SAMLResponse)}&RelayState=${encodeURIComponent(req.body.RelayState)}`);
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);