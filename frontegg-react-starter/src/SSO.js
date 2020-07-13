import React from 'react';
import * as Frontegg from '@frontegg/react';

function Sso() {
  const providerOptions = {
    baseUrl: 'http://localhost:5555/',
    tokenResolver: () => { return 'my-authentication-token'; },
  }

  return (
    <div>
      <Frontegg.ContextProvider value={providerOptions}>
        <Frontegg.SsoConfiguration />
      </Frontegg.ContextProvider>
    </div>
  );
}

export default Sso;
