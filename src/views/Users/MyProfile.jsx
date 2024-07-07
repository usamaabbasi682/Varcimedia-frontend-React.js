import React,{useEffect, useRef, useState} from "react";
import { current } from "@reduxjs/toolkit";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledAlert } from "reactstrap";
import * as Yup from 'yup';
import { profileUpdate } from "features/userSlice";
import useCheckLogin from "hooks/useCheckLogin";
import { editProfile } from "features/userSlice";

const MyProfile = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const {users, isLoading, updating, profile} = useSelector((state) => state.userStore);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const formikRef = useRef(null);
    const [error, setError] = useState('');

    const initialValues = {
        full_name: users.data  && users.data.full_name,
        username: users.data  && users.data.username,
        email: users.data  && users.data.email,
        password: "",
        current_password: ""
    };

    const validate = Yup.object({
        full_name: Yup.string().required('Please Enter Full Name').max(100, 'Full Name must be 100 characters or less'),
        username: Yup.string().required('Please Enter Username'),
        email: Yup.string().email('Email must be a valid email-address').required('Please Enter Email-address'),
        password: Yup.string().nullable().min(8, 'Password must be at least 8 characters'),
        current_password: Yup.string().required('Please Enter Current Password'),
    });

    const submitProfile = (values, formik) => {
        dispatch(profileUpdate(values));
        formikRef.current = formik;
    };

    useEffect(()=>{
        dispatch(editProfile(id));
        if (profile.success) {
            setSuccess(true);
            setError('');
            formikRef?.current?.setSubmitting(false);
        } else {
            formikRef?.current?.setSubmitting(false);
            if (profile?.message?.current_password) {
                setError(profile?.message?.current_password);
            }
            if (profile?.message) {
                setError(profile?.message);
            }
        }
    }, [profile]);
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="3" />
                    <Col md="6">
                        <Card>
                            <UncontrolledAlert color="success" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                User Updated Successfully!
                            </UncontrolledAlert>
                            <CardHeader>
                                <CardTitle tag="h5">Profile Details</CardTitle>
                                <Formik initialValues={initialValues} validationSchema={validate} onSubmit={submitProfile} enableReinitialize={true}>
                                    {
                                        (formik) => {
                                            return (
                                                <>
                                                    <Form>
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">Full Name <span className="text-danger font-weight-bold">*</span></label>
                                                            <Field name="full_name" type="text" className="form-control" placeholder="Enter Full-Name" />
                                                            <ErrorMessage name="full_name" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">E-Mail Address <span className="text-danger font-weight-bold">*</span></label>
                                                            <Field name="email" type="text" className="form-control" placeholder="Enter Email-address" />
                                                            <ErrorMessage name="email" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="username">UserName <span className="text-danger font-weight-bold">*</span></label>
                                                            <Field name="username" type="text" className="form-control" placeholder="Enter UserName" />
                                                            <ErrorMessage name="username" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">Password</label>
                                                            <Field name="password" type="password" className="form-control" placeholder="Enter New Password" />
                                                            <small className="text-muted">Leave blank if you don't want to change it</small> <br/>
                                                            <ErrorMessage name="password" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <hr />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="current_password">Current-Password <span className="text-danger font-weight-bold">*</span></label>
                                                            <Field name="current_password" type="password" className="form-control" placeholder="Enter Current Password" />
                                                            <small className="text-muted">Note: Please Enter your current password to confirm your changes</small><br/>
                                                            {error ? <small className="text-danger">{error}</small> : ''}
                                                            <ErrorMessage name="current_password" component="span" className="text-danger" />
                                                        </div>
                                                        {!isLoading ?
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-md-6 d-flex">
                                                                    <Field type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn-round btn btn-sm btn-primary" name="btn_profile" value="Update Profile" />
                                                                </div>
                                                                <div className="col-md-3 mt-3">
                                                                    {updating ? <div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : ''}
                                                    </Form>
                                                </>
                                            );
                                        }
                                    }
                                </Formik>
                            </CardHeader>
                            <CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="3" />
                </Row>
            </div>
        </>
    );
}

export default MyProfile;