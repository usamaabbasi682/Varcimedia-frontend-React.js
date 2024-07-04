import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import UserPage from "views/User.js";
import Lists from "views/Users/Lists";
import Projects from "views/Projects/Projects";
import CreateUser from "views/Users/CreateUser";
import EditUser from "views/Users/EditUser";
import CreateProject from "views/Projects/CreateProject";
import EditProject from "views/Projects/EditProject";
import Files from "views/Projects/Files";
import MyProjects from "views/Projects/MyProjects";
import ProjectInsight from "views/Projects/ProjectInsight";
import ViewProject from "views/Projects/ViewProject";

var routes = [
  {
    identity: "dashboard",
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
    visiable:true,
  },
  {
    identity:"user",
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-user-run",
    component: <Lists />,
    layout: "/admin",
    visiable:true,
  },
  {
    identity:"user",
    path: "/users/create",
    name: "Create User",
    component: <CreateUser />,
    layout: "/admin",
    visiable:false,
  },
  {
    identity:"user",
    path: "/users/:id/edit",
    name: "Edit User",
    component: <EditUser />,
    layout: "/admin",
    visiable:false,
  },
  {
    identity: "projects",
    path: "/projects",
    name: "Projects",
    icon: "nc-icon nc-single-copy-04",
    component: <Projects />,
    layout: "/admin",
    visiable:true,
  },
  {
    identity: "insights",
    path: "/project-activity",
    name: "Project Insights",
    icon: "nc-icon nc-time-alarm",
    component: <ProjectInsight />,
    layout: "/admin",
    visiable:true,
  },
  {
    identity: "projects",
    path: "/my-projects",
    name: "My Projects",
    component: <MyProjects />,
    layout: "/admin",
    visiable:false,
  },
  {
    identity: "insights",
    path: "/project-discussion/:id",
    name: "Project Discussion",
    component: <ViewProject />,
    layout: "/admin",
    visiable:false,
  },
  {
    identity: "projects",
    path: "/projects/create",
    name: "Create Project",
    component: <CreateProject />,
    layout: "/admin",
    visiable:false,
  },
  {
    identity: "projects",
    path: "/projects/:id/edit",
    name: "Edit Project",
    component: <EditProject />,
    layout: "/admin",
    visiable:false,
  },
  {
    identity: "projects",
    path: "/projects/:id/files",
    name: "Project Files",
    component: <Files />,
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
];
export default routes;
