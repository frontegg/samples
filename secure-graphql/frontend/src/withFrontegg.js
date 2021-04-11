import React from 'react';
import { AuthPlugin } from '@frontegg/react-auth';
import { FronteggProvider } from '@frontegg/react-core';

/**
 * use this object to config Frontegg global context object
 */
const contextOptions = {
    baseUrl: `http://localhost:8080`, // Your server url
    requestCredentials: 'include',
};

const plugins = [
    // add frontegg plugin here
    AuthPlugin({
        /* auth options, find more information at https://github.com/frontegg/frontegg-react/tree/master/packages/auth */
        // header: <img alt='logo' src='THE-URL-TO-MY-COMPANY-LOGO' />
    }),
];

/**
 *  Wrap you entire application with this HOC.
 *  NOTE: Make sure to remove any BrowserRouter in your application if you use ```withRouter``` option
 */
export const withFrontegg = (AppComponent) => (props) => {
    return <FronteggProvider
        plugins={plugins}
        context={contextOptions}>
        <AppComponent {...props} />
    </FronteggProvider>;
};
