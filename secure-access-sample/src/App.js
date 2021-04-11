import React from 'react';
import './App.css';
import { withFrontegg } from './withFrontegg';
import { Route, Switch } from "react-router";
import { SsoConfiguration } from '@frontegg/react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Profile, ProtectedRoute, useAuth, Team } from '@frontegg/react-auth';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import TeamWrapper from './TeamWrapper';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const Component = () => {
  const codeString =
    `<ProtectedRoute path="/team">
  <Team />
</ProtectedRoute>`;
  return (
    <SyntaxHighlighter language="jsx" style={prism} customStyle={{ width: '400px', margin: 'auto' }}>
      {codeString}
    </SyntaxHighlighter>
  );
};

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Frontegg Secure Access</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/team">Team Management</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/sso">SSO Configuration</NavLink>
            </NavItem>
          </Nav>
          <Navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {isAuthenticated ?
                    <>
                      <img style={{ width: '24px', marginRight: '5px', marginTop: '-5px', borderRadius: '15px' }} alt="profile" src={user?.profilePictureUrl} />
                      <span>{user?.name}</span>
                    </> : 'Not logged in'}
                </DropdownToggle>
                <DropdownMenu right>
                  {isAuthenticated && <DropdownItem href="/profile">
                    Profile
                    </DropdownItem>
                  }
                  {isAuthenticated ?
                    <DropdownItem href="/account/logout">
                      Logout
                    </DropdownItem>
                    :
                    <DropdownItem href="/account/login">
                      Login
                    </DropdownItem>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
          {/* {isAuthenticated ? <NavbarText>Logged in expires: {user?.expires}</NavbarText> : <NavbarText>Not logged in</NavbarText>} */}
        </Collapse>
      </Navbar>
      <div>
        <Switch>
          <Route exact path="/">
            <br />
            <br />
            <br />
            Welcome!

            This is a public page which doesn't require authentication<br />
            In order to protect a page and route with authentication use the following: <br /><br /><br />

            <Component style={{ width: '400px' }} />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile.Page />
          </ProtectedRoute>
          <ProtectedRoute path="/team">
            <TeamWrapper />
          </ProtectedRoute>
          <ProtectedRoute exact path="/sso">
            <SsoConfiguration rootDir="/sso" />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
}

export default withFrontegg(App);
