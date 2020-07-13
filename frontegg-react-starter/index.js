const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const { frontegg, FronteggPermissions } = require('@frontegg/client')

const app = express();

const port = process.env.PORT || 5555;
const buildFolder = 'build'

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, buildFolder)));

const clientId = process.env.FRONTEGG_CLIENT_ID;
const apiKey = process.env.FRONTEGG_API_KEY;

app.use('/frontegg', frontegg({
  clientId,
  apiKey,
  contextResolver: async (_) => {
    const email = 'ee@ee.eee';
    const tenantId = 'my-tenant-id';
    const userId = 'my-user-id';

    return {
      email,
      tenantId,
      userId,
      permissions: FronteggPermissions.All,
    }
  }
}))

app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, buildFolder, 'index.html'));
});

console.log(`starting listening on port ${port}`)
app.listen(port, () => {
  console.log('started listening');
});