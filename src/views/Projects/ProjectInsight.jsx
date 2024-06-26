import Insight from "components/Insight";
import useCheckLogin from "hooks/useCheckLogin";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const ProjectInsight = () => {
    useCheckLogin();
    const [status, setStatus] = useState('pending');
  return (
    <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <div className="row pr-3 pl-3">
                                    <div className="col-md-12">
                                        <CardTitle tag="h5">Project Conversations</CardTitle>
                                        <p className="card-category">Share valuable insights, discuss project strategies</p>
                              </div>
                              <div className="col-md-12">
                                  <div className="container-fluid main">
                                        <div className="text-center main-text">
                                            <div className="c2a-btn footer-c2a-btn">
                                            <div
                                                className="btn-group btn-group-lg"
                                                role="group"
                                                aria-label="Call to action"
                                            >
                                                <button onClick={() => {setStatus('pending')}} type="button" className={status == 'pending' ? 'btn btn-dark btn-lg active' : 'btn btn-dark btn-lg active'}>
                                                Active
                                                </button>
                                                <span className="btn-circle btn-or">or</span>
                                                <button type="button" onClick={() => {setStatus('completed')}} className="btn btn-dark btn-lg">
                                                 Completed
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </CardHeader>
                      <CardBody>
                    <Insight status={status} />      
                    </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
  );
};

export default ProjectInsight;