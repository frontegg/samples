import React from 'react';
import * as Frontegg from '@frontegg/react';

function Audits() {

  const providerOptions = {
    baseUrl: 'http://localhost:5555/',
    tokenResolver: () => { return 'my-token'; },
  };

  return (
    <div>
      <Frontegg.ContextProvider value={providerOptions}>
        <Frontegg.Audits />
      </Frontegg.ContextProvider>
    </div>
  );
}

export default Audits;
