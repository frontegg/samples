import React, { useEffect, useState } from 'react';
import { ContextOptions, PluginConfig, FronteggProvider } from '@frontegg/react-core';
import { StaticRouter } from 'react-router';
import { useRouter } from 'next/router';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-material-ui';

/**
 * use this object to config Frontegg global context object
 */
const contextOptions: ContextOptions = {
  baseUrl: `http://localhost:3000/api`,
  requestCredentials: 'include',
};

const plugins: PluginConfig[] = [
  AuthPlugin({
    /* auth options, find more information at https://github.com/frontegg/frontegg-react/tree/master/packages/auth */
    injectAuthRoutes: false,
  }),
];

export const withFrontegg = (AppComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    return (
      <StaticRouter location={router.pathname}>
        <FronteggProvider
          plugins={plugins}
          uiLibrary={uiLibrary}
          onRedirectTo={(path) => {
            router.push(path, path, { shallow: false });
          }}
          context={contextOptions}>
          <AppComponent {...props} />
        </FronteggProvider>
      </StaticRouter>
    );
  };
};
