import { viewProject } from "features/projectSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import "../../assets/css/chat.css";

const ViewProject = () => {
    const dispatch = useDispatch();
    const {projects,isLoading} = useSelector((state) => state.projectStore);
    const { id } = useParams();

    const renderHtml = ({description}) => {
        return (
            <>
                {description}
            </>
        );
    };

    useEffect(() => {
        dispatch(viewProject(id));
    },[]);
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
                                <div className="container py-5 px-4">
                                    <div className="row rounded-lg overflow-hidden shadow">
                                        <div className="col-5 px-0">
                                            <div className="bg-white">
                                            <div className="bg-gray px-4 py-2 bg-light">
                                                <p className="h5 mb-0 py-1">Recent</p>
                                            </div>
                                            <div className="messages-box">
                                                <div className="list-group rounded-0">
                                                        <a className="list-group-item list-group-item-action active text-white rounded-0">
                                                            <div className="media">
                                                                <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                                <div className="media-body ml-4">
                                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                                        <h6 className="mb-0">Jason Doe</h6>
                                                                        <small className="small font-weight-bold">25 Dec</small>
                                                                    </div>
                                                                    <p className="font-italic mb-0 text-small">
                                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                                        sed do eiusmod tempor incididunt ut labore.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
                                                            <div className="media">
                                                                <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                                <div className="media-body ml-4">
                                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                                        <h6 className="mb-0">Jason Doe</h6>
                                                                        <small className="small font-weight-bold">14 Dec</small>
                                                                    </div>
                                                                    <p className="font-italic text-muted mb-0 text-small">
                                                                        Lorem ipsum dolor sit amet, consectetur. incididunt ut
                                                                        labore.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-7 px-0">
                                            <div className="px-4 py-5 chat-box bg-white">
                                                <div className="media w-50 mb-3">
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                        <div className="media-body ml-3">
                                                            <div className="bg-light rounded py-2 px-3 mb-2">
                                                                <p className="text-small mb-0 text-muted"> Test which is a new approach all solutions</p>
                                                            </div>
                                                            <p className="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                                <div className="media w-50 ml-auto mb-3">
                                                    <div className="media-body">
                                                        <div className="bg-primary rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-white"> Test which is a new approach to have all solutions </p>
                                                        </div>
                                                        <p className="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                                <div className="media w-50 mb-3">
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                    <div className="media-body ml-3">
                                                        <div className="bg-light rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-muted">Test, which is a new approach to have</p>
                                                        </div>
                                                        <p className="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                                <div className="media w-50 ml-auto mb-3">
                                                    <div className="media-body">
                                                        <div className="bg-primary rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-white"> Apollo University, Delhi, India Test </p>
                                                        </div>
                                                        <p className="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                                <div className="media w-50 mb-3">
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                    <div className="media-body ml-3">
                                                        <div className="bg-light rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-muted">Test, which is a new approach</p>
                                                        </div>
                                                        <p className="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                                <div className="media w-50 ml-auto mb-3">
                                                    <div className="media-body">
                                                        <div className="bg-primary rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-white">
                                                                Apollo University, Delhi, India Test
                                                            </p>
                                                        </div>
                                                        <p className="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <form action="#" className="bg-light">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 bg-light" />
                                                    <div className="input-group-append">
                                                        <button id="button-addon2" type="submit" className="btn btn-link text-primary">
                                                            <i className="fa fa-paper-plane" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ViewProject;