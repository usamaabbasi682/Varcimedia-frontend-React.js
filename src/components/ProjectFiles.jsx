import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button,UncontrolledAlert } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteProjectFile } from "features/projectSlice";

const ProjectFiles = ({ files, isLoading }) => {
    let count = 1;
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const deleteFile = (id) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            dispatch(deleteProjectFile(id));
        }
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Project Files</CardTitle>
                </CardHeader>
                        <CardBody>
                            <UncontrolledAlert color="success" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                File Deleted Successfully!
                            </UncontrolledAlert>
                        <ul className="list-unstyled team-members">
                            {
                                files?.length > 0 ? 
                                    files?.map?.((file) => {
                                        return (
                                            <>
                                                <li>
                                                    <Row>
                                                        <Col md="1" xs="1">
                                                            <Button className="btn-round btn-icon" color="success" outline size="sm">
                                                                {count++}
                                                            </Button>
                                                        </Col>
                                                        <Col md="8" xs="7">
                                                            {file?.original_name} <br />
                                                            <span className="text-muted">
                                                                <small>{ file?.uploaded_at }</small>
                                                            </span>
                                                        </Col>
                                                        <Col className="text-right" md="3" xs="3">
                                                            <Link to={file?.url} className="btn-round btn-icon"  target="_blank" download color="black" outline size="sm">
                                                                <i className="fa fa-download text-dark" />
                                                            </Link>
                                                            <Button onClick={() => deleteFile(file?.id)} className=" btn-icon" color="danger" outline size="sm">
                                                                <i className="fa fa-trash" />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            </>
                                        )
                                    })
                                : 'No File Selected'
                            }
                        </ul>
                        <button type="button" onClick={() => navigate('/admin/projects')} className="btn btn-danger"><i className="fa fa-arrow-circle-left" /> Back</button>
                </CardBody> 
            </Card>
        </>
    );
}

export default ProjectFiles;