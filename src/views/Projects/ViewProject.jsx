import { viewProject } from "features/projectSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import "../../assets/css/chat.css";
import Chat from "components/Chat";
import useCheckLogin from "hooks/useCheckLogin";

const ViewProject = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const {projects,isLoading} = useSelector((state) => state.projectStore);
    const { id } = useParams();
    const [recallProject, setRecallProject] = useState(false);

    useEffect(() => {
        dispatch(viewProject(id));
    },[recallProject]);
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <div className="row pr-3 pl-3">
                                    <div className="col-md-12">
                                        <CardTitle tag="h5">{projects?.data && projects?.data?.title}</CardTitle>
                                        <p className="card-category">Created-By: {projects?.data && projects?.data?.user} | <span className="mt-4 badge bg-dark text-light">{projects?.data && projects?.data?.status}</span></p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Row className="pr-3 pl-3">
                                    <Col md="12" style={{ borderStyle: 'dashed', borderColor: '#d6d6d6' }}>
                                        {projects?.data && projects?.data?.description != '' ?
                                            <div className="p-3" dangerouslySetInnerHTML={{ __html: projects?.data && projects?.data?.description }} />
                                            : <span className="text-danger p-3">No Description Found!!</span>}
                                    </Col>
                                    <Col md="12 pt-2" style={{ borderStyle: 'dashed', borderColor: '#d6d6d6' }}>
                                        <p className="font-weight-bold text-secondary">Published Date: {projects?.data && projects?.data?.created_at}</p>
                                        <p className="font-weight-bold text-secondary">Project End Date: {projects?.data && projects?.data?.end_date}</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                    <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <Chat recallProject={recallProject} setRecallProject={setRecallProject} chatUsers={projects?.data && projects?.data?.users} loading={isLoading} project_id={id} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ViewProject;