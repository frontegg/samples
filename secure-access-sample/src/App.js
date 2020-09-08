import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withFrontegg } from './withFrontegg';
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
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
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
    </div>
  );
}

export default withFrontegg(App);
