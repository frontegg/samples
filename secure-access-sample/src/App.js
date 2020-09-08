import React from 'react';
import './App.css';
import { withFrontegg } from './withFrontegg';
import { Route, Switch } from "react-router";
import { Team, SsoConfiguration } from '@frontegg/react';
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
  NavbarText
} from 'reactstrap';
import { useAuth } from '@frontegg/react-auth';

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
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/account/logout">
                  Logout
                </DropdownItem>
                <DropdownItem href="/account/login">
                  Login
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {isAuthenticated ? <NavbarText>Logged in expires: {user?.expires}</NavbarText> : <NavbarText>Not logged in</NavbarText>}
        </Collapse>
      </Navbar>
      <div>
        <Switch>
          <Route exact path="/">
            Welcome!
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route exact path="/sso">
            <SsoConfiguration />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withFrontegg(App);
