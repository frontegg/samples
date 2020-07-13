import React from 'react';
import * as Frontegg from '@frontegg/react';

function Notifications() {
  const providerOptions = {
    baseUrl: 'http://localhost:5555/',
    tokenResolver: () => { return 'my-authentication-token'; },
  }

  return (
    <div>
      <Frontegg.ContextProvider value={providerOptions}>
        <Frontegg.Notifications />
      </Frontegg.ContextProvider>
    </div>
  );
}

export default Notifications;
