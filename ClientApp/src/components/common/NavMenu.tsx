import React, { Component } from "react";
import {
  Collapse,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./index.css";
import logo from "./ListMateLogo.png";

const env = process.env.REACT_APP_ENVIRONMENT;

class NavMenu extends Component {
  static displayName = NavMenu.name;

  state = {
    collapsed: true,
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    console.log("show nav");
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3 custom-navbar"
          container
          dark
        >
          <NavbarBrand tag={Link} to="/" className="navbar-brand-custom">
          <img 
                alt="ListMate"
                src={logo}
                style={{
                    height: 40,
                    width: 40
                }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!this.state.collapsed}
            navbar
          >
            <ul className="navbar-nav align-items-center flex-grow">
              <NavItem>
                <NavLink tag={Link} to="/" className="nav-link-custom">
                  Home
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default NavMenu;