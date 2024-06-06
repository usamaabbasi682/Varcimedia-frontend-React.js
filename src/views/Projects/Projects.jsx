import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody,CardTitle, Row, Col, Table,UncontrolledAlert } from "reactstrap";
const Projects = () => {
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>

                            <CardHeader>
                                <div className="row pr-3 pl-3">
                                    <div className="col-md-10">
                                        <CardTitle tag="h5">All Users</CardTitle>
                                        <p className="card-category">All users are listed below</p>
                                    </div>
                                    <div className="col-md-2 text-right pt-2">
                                        <Link to="create" className="btn btn-dark btn-sm">Add User</Link>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Projects;