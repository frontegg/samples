import React, { useEffect, useState } from 'react';
import { ContextOptions, PluginConfig } from '@frontegg/react-core';
import { StaticRouter } from 'react-router';
import { useRouter } from 'next/router';

const isSSR = typeof window === 'undefined';

/**
 * use this object to config Frontegg global context object
 */
const contextOptions: ContextOptions = {
  baseUrl: `http://localhost:3000/api`,
  requestCredentials: 'include',
};

export const withFrontegg = (AppComponent: any) => {
  return (props: any) => {
    const [{ FronteggProvider, AuthPlugin, uiLibrary }, loadLib] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
      import('@frontegg/react-core').then(({ FronteggProvider }) => {
        loadLib((prevState) => ({ ...prevState, FronteggProvider }));
      });
      import('@frontegg/react-auth').then(({ AuthPlugin }) => {
        loadLib((prevState) => ({ ...prevState, AuthPlugin }));
      });
      import('@frontegg/react-elements-material-ui').then(({ uiLibrary }) => {
        loadLib((prevState) => ({ ...prevState, uiLibrary }));
      });
    }, []);

    if (isSSR || !FronteggProvider || !AuthPlugin || !uiLibrary) {
      return <AppComponent {...props} />;
    }


    const plugins: PluginConfig[] = [
      AuthPlugin({
        /* auth options, find more information at https://github.com/frontegg/frontegg-react/tree/master/packages/auth */
        // injectAuthRoutes: false,
      }),
    ];
    return (
      <StaticRouter location={window.location}>
        <FronteggProvider
          plugins={plugins}
          uiLibrary={uiLibrary}
          onRedirectTo={(path)=>{
            router.push(path, path)
          }}
          context={contextOptions}>
          <AppComponent {...props} />
        </FronteggProvider>
      </StaticRouter>
    );
  };
};
