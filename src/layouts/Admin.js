import React, { useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

var ps;

const Dashboard = (props) => {
  // const [role, setRole] = React.useState(null);
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;
    

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar {...props} routes={routes} bgColor={backgroundColor} activeColor={activeColor} role={role} />
      <div className="main-panel" ref={mainPanel}>
        <Navbar {...props} />
        <Routes>
          {routes.map((prop, key) => {
            if (role == 'admin') {
              return (
                <>
                  <Route path={prop.path} element={prop.component} key={key} exact />
                </>
              );
            } else {
              if (prop.identity != 'user') {
                return (
                  <>
                    <Route path={prop.path} element={prop.component} key={key} exact />
                  </>
                );
              } else {
                return (
                  <>
                    <Route path={prop.path} element={<Navigate to="/admin/dashboard" />} key={key} exact />
                  </>
                );
              }
            }
          })}
        </Routes>
        <Footer fluid />
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />
    </div>
  );
}

export default Dashboard;
