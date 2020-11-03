import { FronteggPermissions, fronteggNextJs, withAuthentication } from '@frontegg/client';

const FRONTEGG_CLIENT_ID = '[FRONTEGG_CLIENT_ID]';
const FRONTEGG_API_KEY = '[FRONTEGG_API_KEY]';

// const tenantId = process.env.TENANT_ID || 'my-tenant-id';
// const userId = 'my-user-id';

export default fronteggNextJs({
  apiKey: FRONTEGG_API_KEY,
  clientId: FRONTEGG_CLIENT_ID,
  authMiddleware: withAuthentication(),
  pathRewrite: { '/api/frontegg': '' },
  contextResolver: async (req: any) => {
    const permissions = [
      FronteggPermissions.All,
    ];

    return {
      tenantId: req.user ? req.user.tenantId : null,
      userId: req.user ? req.user.id : null,
      permissions,
    };

  },
});
