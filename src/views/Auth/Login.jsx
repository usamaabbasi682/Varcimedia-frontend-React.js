import useAuth from "hooks/useAuth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Card, CardBody, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "features/Auth/loginSlice";

const Login = () => {
    useAuth();
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.authStore);
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();
    const formikRef = useRef();

    const initialValues = {
        email: '',
        password: '',
    };

    const validate = Yup.object({
        email: Yup.string().email('Email must be a valid email-address').required('Please Enter Email-address'),
        password:Yup.string().required('Please Enter Password'),
    });

    const handleSubmit = (values, formik) => {
        dispatch(authentication(values));
        formikRef.current = formik;
    }


    useEffect(() => {
        if (data.success) {
            sessionStorage.setItem('spa_token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.data));
            formikRef?.current?.setSubmitting(false);
            formikRef?.current?.resetForm();
            navigate('/admin/dashboard');
        } else {
            formikRef?.current?.setSubmitting(false);
            formikRef?.current?.resetForm();
            setAuthError(data.message);
        }
        setTimeout(() => {
            setAuthError('')
        },2000);
    }, [data]);
    
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
                                <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit}>
                                    {
                                        (formik) => {
                                            return (
                                                <>
                                                    <Form>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <Field type="text" name="email" className="form-control" autoComplete="email" placeholder="Enter email-address" />
                                                            <ErrorMessage name="email" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">Password</label>
                                                            <Field type="password" name="password" autoComplete="password" className="form-control" placeholder="Enter password" />
                                                            <ErrorMessage name="password" component="span" className="text-danger" />
                                                            {!data.success ? <span className="text-danger">{authError}</span> : ''}
                                                        </div>
                                                        <Row>
                                                            <Col md="8">
                                                                <Field type="checkbox" name="remember" /> &nbsp;
                                                                <label htmlFor="remember">Keep me signed in</label>
                                                            </Col>
                                                            <Col md="4">
                                                                <Link to="#">Forgot Password</Link>
                                                            </Col>
                                                        </Row>
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <Field type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-primary" name="btn_submit" />
                                                                </div>
                                                                <div className="col-md-3 mt-3">
                                                                    {isLoading ? <div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </>
                                            )
                                        }
                                    }
                                </Formik>
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
