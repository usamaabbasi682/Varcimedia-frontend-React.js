import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Lists from "views/Users/Lists";
import Projects from "views/Projects/Projects";
import CreateUser from "views/Users/CreateUser";
import EditUser from "views/Users/EditUser";
import CreateProject from "views/Projects/CreateProject";
import EditProject from "views/Projects/EditProject";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-user-run",
    component: <Lists />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/users/create",
    name: "Create User",
    component: <CreateUser />,
    layout: "/admin",
    visiable:false,
  },
  {
    path: "/users/:id/edit",
    name: "Edit User",
    component: <EditUser />,
    layout: "/admin",
    visiable:false,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "nc-icon nc-single-copy-04",
    component: <Projects />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/projects/create",
    name: "Create Project",
    component: <CreateProject />,
    layout: "/admin",
    visiable:false,
  },
  {
    path: "/projects/:id/edit",
    name: "Edit Project",
    component: <EditProject />,
    layout: "/admin",
    visiable:false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: <Maps />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notifications />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/admin",
    visiable:true,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <Typography />,
    layout: "/admin",
    visiable:true,
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: <UpgradeToPro />,
    layout: "/admin",
    visiable:true,
  },
];
export default routes;
