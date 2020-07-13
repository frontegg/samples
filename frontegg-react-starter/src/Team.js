import React from 'react';
import * as Frontegg from '@frontegg/react';

function Team() {
  const providerOptions = {
    baseUrl: 'http://localhost:5555/',
    tokenResolver: () => { return 'my-authentication-token'; },
  }

  return (
    <div>
      <Frontegg.ContextProvider value={providerOptions}>
        <Frontegg.Team />
      </Frontegg.ContextProvider>
    </div>
  );
}

export default Team;
