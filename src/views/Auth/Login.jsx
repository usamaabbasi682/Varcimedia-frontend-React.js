import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="4"></Col>
                    <Col md="4" className="mt-5">
                        <Card className="card-user">
                            <div className="image rounded" style={{ background:' linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(81, 203, 206) 100%)' }}>
                                {/* <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} /> */}
                            </div>
                            <CardBody className="pb-5">
                                <div className="author">
                                        <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} />
                                        <h6 className="title">Sign in to your Account</h6>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="Email">Email</label>
                                        <input type="text" name="email" className="form-control" placeholder="Enter email" />    
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="Enter Password" />    
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary">submit</button>
                                    </div>
                                    <Row>
                                        <Col md="8">
                                            <input type="checkbox" name="remember" /> &nbsp;
                                            <span htmlFor="remember">Keep me signed in</span>
                                        </Col>
                                        <Col md="4">
                                            <Link to={''}>Forgot Password</Link>
                                        </Col>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </div>
        </>
    );
};

export default Login;
