import React, { useState, useEffect, useRef } from "react";
import { userCreate } from "features/userSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledAlert } from "reactstrap";
import * as Yup from 'yup';
import useCheckLogin from "hooks/useCheckLogin";

const CreateUser = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.userStore);
    const [errors, setErrors] = useState({ username: '', email: '' });
    const [success, setSuccess] = useState(false);
    const formikRef = useRef(null);

    const initialValues = {
        full_name: '',
        username: '',
        email: '',
        password: '',
        role: '',
    };

    const validate = Yup.object({
        full_name: Yup.string().required('Please Enter Full Name').max(100, 'Full Name must be 100 characters or less'),
        username: Yup.string().required('Please Enter Username'),
        email: Yup.string().email('Email must be a valid email-address').required('Please Enter Email-address'),
        password: Yup.string().required('Please Enter Password').min(8, 'Password must be 8 characters or more'),
        role: Yup.string().required('Please Select Role'),
    });

    const handleSubmit = (values, formik) => {
        dispatch(userCreate(values));
        formikRef.current = formik;
    }

    useEffect(() => {
        if (users.success) {
            setSuccess(true);
            if (formikRef.current != null) {
                formikRef.current.setSubmitting(false);
                formikRef.current.resetForm();
            }
        } else {
            if (formikRef.current != null) formikRef.current.setSubmitting(false);
            setErrors({ username: users?.message?.username?.[0] ?? '', email: users?.message?.email?.[0] ?? '' });
        }

        setTimeout(() => {
            setErrors({ username: '', email: '' });
        }, 3000);

    }, [users]);


    return (
        <>
            <div className="content">
                <Row>
                    <Col md="3" />
                    <Col md="6">
                        <Card>
                            <UncontrolledAlert color="success" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                User Created Successfully!
                            </UncontrolledAlert>
                            <CardHeader>
                                <CardTitle tag="h5">Add New User</CardTitle>
                                {/* <p className="card-category">Fill out all below fields.</p> */}
                            </CardHeader>
                            <CardBody>
                                <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit}>
                                    {
                                        (formik) => {
                                            return (
                                                <>
                                                    <Form>
                                                        <div className="form-group">
                                                            <label htmlFor="full_name">Full Name</label>
                                                            <Field type="text" name="full_name" className="form-control" placeholder="Enter Full Name" />
                                                            <ErrorMessage name="full_name" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="username">Username</label>
                                                            <Field type="text" name="username" className="form-control" placeholder="Enter Username" />
                                                            <ErrorMessage name="username" component="span" className="text-danger" />
                                                            {errors.username && <p className="text-danger">{errors.username}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <Field type="text" name="email" className="form-control" placeholder="Enter Email" />
                                                            <ErrorMessage name="email" component="span" className="text-danger" />
                                                            {errors.email && <p className="text-danger">{errors.email}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">Password</label>
                                                            <Field type="password" name="password" className="form-control" placeholder="Enter Password" />
                                                            <ErrorMessage name="password" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="role">Role</label>
                                                            <Field as="select" name="role" className="form-control">
                                                                <option value="">Select Role</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="client">Client</option>
                                                                <option value="writer">Writer</option>
                                                                <option value="editor">Editor</option>
                                                            </Field>
                                                            <ErrorMessage name="role" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <Field type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-primary" name="btn_create" value="Create User" />
                                                            </div>
                                                            <div className="col-md-3 mt-3">
                                                                {isLoading ? <div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div> : ''}
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </>
                                            );
                                        }
                                    }
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="3" />
                </Row>
            </div>
        </>
    );
}

export default CreateUser;