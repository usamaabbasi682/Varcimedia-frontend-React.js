import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";

var ps;

const Sidebar = (props) => {
  const location = useLocation();
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <Link to={'/admin/dashboard'} className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </Link>
        <Link to={'/admin/dashboard'} className="simple-text logo-normal"> VarciMedia </Link>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (props.role == 'admin' && prop.visiable) {
                return (
                  <>
                    <li className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                      <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  </>
                );
            } else {
              if ((props.role == 'writer' || props.role == 'editor') && prop.visiable) {
                if(prop.identity != 'user' && prop.identity != 'projects' && prop.identity != 'history' && prop.visiable) {
                  return (
                    <>
                      <li className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                        <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    </>
                  );
                }
              } else {
                if(prop.identity != 'user' && prop.identity != 'history' && prop.visiable) {
                  return (
                    <>
                      <li className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                        <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    </>
                  );
                }
              }
            }
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
