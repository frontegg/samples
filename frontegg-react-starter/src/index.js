import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Audits from './Audits';
import Team from './Team';
import Notifications from './Notifications';
import SSO from './SSO';
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="audits">Audit logs</Nav.Link>
          <Nav.Link href="team">Team Management</Nav.Link>
          <Nav.Link href="notifications">Notifications</Nav.Link>
          <Nav.Link href="sso">SSO</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Router>
      <Switch>
        <Route path="/audits" component={Audits} />
        <Route path="/team" component={Team} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/sso" component={SSO} />

        <Route path="/" component={App} />
        {/* <Route path="/users" component={Users} />
      <Route path="/contact" component={Contact} /> */}
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
