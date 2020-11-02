import { FronteggPermissions, fronteggNextJs } from '@frontegg/client';
import jwt_decode from 'jwt-decode';

const FRONTEGG_CLIENT_ID = '93447df4-edcc-45e5-8664-9fb8c196cf44';
const FRONTEGG_API_KEY = '71e8ca5a-3786-4d1b-8fcd-a111d07c7bc2';

const tenantId = process.env.TENANT_ID || 'my-tenant-id';
const userId = 'my-user-id';

export default fronteggNextJs({
  prefixRoute: '/api/frontegg',
  apiKey: FRONTEGG_API_KEY,
  clientId: FRONTEGG_CLIENT_ID,
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
