import { logout } from "features/Auth/logoutSlice";
import useGetData from "hooks/useGetData";
import useGetRole from "hooks/useGetRole";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";

const Header = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.logoutStore);
  
  const role = useGetRole();
  const user = useGetData();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const sidebarToggle = useRef();
  const location = useLocation();

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  useEffect(() => {
    if (data.data.success) {
      sessionStorage.clear();
       window.location.href = '/login';
    }
  }, [data]);

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar color={location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color} expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="javascript:void(0)">{getBrand()} | {user?.full_name} | <span  className="badge badge-light">{ role }</span></NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <Dropdown nav isOpen={dropdownOpen} toggle={(e) => dropdownToggle(e)} >
              <DropdownToggle caret nav>
                <i className="fas fa-user-circle" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="span"><Link to={`/admin/my-profile/${user?.id}/edit`} className="text-dark">My Profile</Link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <button onClick={handleLogout} className="btn btn-sm bg-light border-0">
                {data.isLoading ? <span className="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></span> : <i className="nc-icon nc-button-power text-danger font-weight-bold" />}
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
