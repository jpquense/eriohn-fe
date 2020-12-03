import React from "react";
// I prefer using scss instead of css but it works well for this use case

import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard/DashboardContainer";
import AboutComponent from "./components/About/Misc/AboutComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">eriohn</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">Dashboard</Link>
              {" | "}
              <Link to="/about">About</Link>
            </NavItem>
          </Nav>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <AboutComponent />
          </Route>
          <Route path="/">
            <DashboardContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
