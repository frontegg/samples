import { FronteggPermissions, fronteggNextJs } from '@frontegg/client';
import jwt_decode from 'jwt-decode';

const FRONTEGG_CLIENT_ID = '[FRONTEGG_CLIENT_ID]';
const FRONTEGG_API_KEY = '[FRONTEGG_API_KEY]';

const tenantId = process.env.TENANT_ID || 'my-tenant-id';
const userId = 'my-user-id';

export default fronteggNextJs({
  prefixRoute: '/api/frontegg',
  apiKey: FRONTEGG_API_KEY,
  clientId: FRONTEGG_CLIENT_ID,
  cookieDomainRewrite: 'localhost',
  contextResolver: async (req) => {
    let requestUserId = userId;
    let requestTenantId = tenantId;

    if (req.headers.authorization) {
      console.log('authorization header - ', req.headers.authorization);
      const jwt = jwt_decode(req.headers.authorization.replace('Bearer ', ''));
      requestUserId = jwt.sub;
      requestTenantId = jwt.tenantId;
    }

    const permissions = [
      FronteggPermissions.All,
    ];

    return {
      tenantId: requestTenantId,
      userId: requestUserId,
      permissions,
    };

  },
});
