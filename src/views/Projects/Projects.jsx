import { projectLists } from "features/projectSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, UncontrolledAlert } from "reactstrap";
import Loader from "components/Loader";
import useCheckLogin from "hooks/useCheckLogin";
import Pagination from "components/Pagination/Pagination";
import { deleteProjectRow } from "features/projectSlice";


const Projects = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const [search, setSearch] = useState(null);
    const { projects, isLoading } = useSelector((state) => state.projectStore);
    const [page, setPage] = useState(1);
    const [success, setSuccess] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }


    const deleteProject = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteProjectRow(id));
            dispatch(projectLists({ search: search, page: page }))
            setSuccess(true);
        }
    }

    useEffect(() => { 
        dispatch(projectLists({search:search,page:page}));
    }, [search,page]);
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            {
                                !isLoading ?
                                    <UncontrolledAlert color="danger" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                        Project Deleted Successfully!
                                    </UncontrolledAlert>
                                    : ''
                            }
                            <CardHeader>
                                <div className="row pr-3 pl-3">
                                    <div className="col-md-10">
                                        <CardTitle tag="h5">All Projects</CardTitle>
                                        <p className="card-category">All projects are listed below</p>
                                    </div>
                                    {/* <div className="col-md-2 text-right pt-2">
                                        <Link to={'create'} className="btn btn-info btn-sm">My Projects</Link>
                                    </div> */}
                                    <div className="col-md-2 text-right pt-2">
                                        <Link to={'create'} className="btn btn-dark btn-sm">Add Project</Link>
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <input type="search" style={{ width:'14%' }} value={search} onChange={handleSearch} className="form-control form-control-sm" placeholder="Search" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>SR#</th>
                                            <th>User</th>
                                            <th>Project Name</th>
                                            <th>Associated User | Role</th>
                                            <th>End Date</th>
                                            <th>Status</th>
                                            <th className="text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !isLoading ?
                                            projects?.data?.map?.((project, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{project.id}</td>
                                                            <td>{project.user}</td>
                                                            <td>{project.name}</td>
                                                            <td>
                                                                {
                                                                    project?.users?.map?.((user, userIndex) => {
                                                                        return (
                                                                            <>
                                                                                <span className="badge badge-dark badge-pill">{user.full_name} | {user.role}</span>
                                                                            </>
                                                                        );
                                                                    })
                                                                }
                                                            </td>
                                                            <td>{ project.end_date}</td>
                                                            <td><span className={project.status === 'publish' ? 'badge badge-warning badge-pill' : 'badge badge-secondary badge-pill'}>{project.status}</span></td>
                                                            <td className="text-right">
                                                                <Link to={`${project.id}/edit`} className="btn btn-success btn-sm">Edit</Link>
                                                                <button onClick={()=>{deleteProject(project.id)}} className="btn btn-danger btn-sm">Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                                : 
                                                <tr>
                                                    <td colSpan={6}>
                                                        <Loader />
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="text-right" colSpan={7}>
                                                <Pagination users={projects} setPage={setPage} page={page} />
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Projects;