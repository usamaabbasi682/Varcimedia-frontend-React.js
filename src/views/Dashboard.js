import DashboardCard from "components/DashboardCard";
import Loader from "components/Loader";
import { dashboardData } from "features/dashboardSlice";
import useCheckLogin from "hooks/useCheckLogin";
import useGetRole from "hooks/useGetRole";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// reactstrap components
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";

function Dashboard() {
  useCheckLogin();
  const role = useGetRole();
  const dispatch = useDispatch();
  const { dashboard, isLoading } = useSelector(state => state.dashboardStore);
  const [page, setPage] = useState(null);

  const pageClick = (url) => {
    if (url != null) {
        const pageValue = url.match(/page=(\d+)/)[1];
        setPage(pageValue);   
    }
  }
  
  useEffect(()=>{
    dispatch(dashboardData({page: page}));
  }, [page]);

  return (
    <>
      <div className="content">
        {role == "admin" ?
          <Row>
            <DashboardCard icon="nc-icon nc-user-run" iconColor="text-warning" title="Users" value={dashboard?.data?.total_users} footerText="Total Registered Users" footerIcon="fas fa-user" />
            <DashboardCard icon="nc-icon nc-single-copy-04" iconColor="text-success" title="Projects" value={dashboard?.data?.total_projects} footerText="Total Listed Projects" footerIcon="fas fa-project-diagram" />
            <DashboardCard icon="nc-icon nc-paper" iconColor="text-danger" title="Pending Projects" value={dashboard?.data?.total_pending_projects} footerText="Total Listed Active-Projects" footerIcon="fas fa-clock" />
            <DashboardCard icon="nc-icon nc-trophy" iconColor="text-primary" title="Completed Projects" value={dashboard?.data?.total_completed_projects} footerText="Total Listed Completed-Projects" footerIcon="fas fa-trophy" />
          </Row> : '' }
        {role == "client" ?
          <Row>
            <DashboardCard icon="nc-icon nc-single-copy-04" iconColor="text-success" title="Projects" value={dashboard?.data?.client_total_projects} footerText="Projects You Created" footerIcon="fas fa-project-diagram" />
            <DashboardCard icon="nc-icon nc-paper" iconColor="text-danger" title="Pending Projects" value={dashboard?.data?.client_total_pending_projects} footerText="Total Listed Pending-Projects" footerIcon="fas fa-clock" />
            <DashboardCard icon="nc-icon nc-trophy" iconColor="text-primary" title="Completed Projects" value={dashboard?.data?.client_total_completed_projects} footerText="Total Listed Completed-Projects" footerIcon="fas fa-trophy" />
            <DashboardCard icon="nc-icon nc-basket" iconColor="text-warning" title="Added Projects" value={dashboard?.data?.client_total_added_in_projects} footerText="Projects, You Added as Client" footerIcon="fas fa-plus" />
          </Row> : '' }
        
        { role == "admin" ?
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  {/* <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  /> */}
                </CardBody>
                <CardFooter>
                  {/* <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr /> */}
                  <div className="stats">
                    {/* <i className="fa fa-calendar" /> Number of emails sent */}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Users Project</CardTitle>
                  <p className="card-category">All the users that have built the projects.</p>
                </CardHeader>
                <CardBody>
                  <table className="table">
                    <thead className="text-dark">
                      <tr style={{ textAlign: "center" }}>
                        <th>SR#</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Projects</th>
                        <th>Pending</th>
                        <th>Completed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading ?
                        dashboard?.data?.users?.map?.((user, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td>{user.id}</td>
                            <td>{user.full_name}</td>
                            <td><span className="badge badge-danger text-light badge-pill">{user.role}</span></td>
                            <td>{user.projects}</td>
                            <td>{user.pending_projects}</td>
                            <td>{user.completed_projects}</td>
                          </tr>
                        )) : <tr ><td colSpan={6}><Loader /></td></tr>}
                    </tbody>
                  </table>
                </CardBody>
                <CardFooter>
                  <div className="chart-legend" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={(e) => { pageClick(dashboard?.data?.pagination?.user?.prev_page_url) }} className="btn btn-dark btn-sm">Previous</button> &nbsp;
                    <button onClick={(e) => { pageClick(dashboard?.data?.pagination?.user?.next_page_url) }} className="btn btn-dark btn-sm">Next</button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        : <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  {/* <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  /> */}
                </CardBody>
                <CardFooter>
                  {/* <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr /> */}
                  <div className="stats">
                    {/* <i className="fa fa-calendar" /> Number of emails sent */}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Your Contributed Projects</CardTitle>
                  <p className="card-category">All the Projects that You have Added.</p>
                </CardHeader>
                <CardBody>
                  <table className="table">
                    <thead className="text-dark">
                      <tr style={{ textAlign: "center" }}>
                        <th>SR#</th>
                        <th>User</th>
                        <th>Project Name</th>
                        <th>End Date</th>
                        <th>Work-Status</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading ?
                        dashboard?.data?.projects?.map?.((project, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td>{project.id}</td>
                            <td>{project.user}</td>
                            <td>{project.name}</td>
                            <td>{ project.end_date}</td>
                            <td><span className={`badge ${project.work_status == 'completed' ? 'badge-success' : 'badge-danger'} text-light badge-pill`}>{project.work_status}</span></td>
                            <td><span className={`badge ${project.status == 'publish' ? 'badge-primary' : 'badge-secondary'} text-light badge-pill`}>{project.status}</span></td>
                          </tr>
                        )) : <tr ><td colSpan={6}><Loader /></td></tr>}
                    </tbody>
                  </table>
                </CardBody>
                <CardFooter>
                  <div className="chart-legend" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={(e) => { pageClick(dashboard?.data?.pagination?.project?.prev_page_url) }} className="btn btn-dark btn-sm">Previous</button> &nbsp;
                    <button onClick={(e) => { pageClick(dashboard?.data?.pagination?.project?.next_page_url) }} className="btn btn-dark btn-sm">Next</button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>}
      </div>
    </>
  );
}

export default Dashboard;
