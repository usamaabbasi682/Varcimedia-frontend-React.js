import Loader from "components/Loader";
import { updateUser } from "features/userSlice";
import { editUser } from "features/userSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col,UncontrolledAlert } from "reactstrap";
import * as Yup from 'yup';

const EditUser = () => {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.userStore);
    const { id } = useParams();
    const [success,setSuccess] = useState(false);

    const roles = [
        {
            value: 'admin',
            label: 'Admin',
        },
        {
            value: 'client',
            label: 'Client',
        },
        {
            value: 'writer',
            label: 'Writer',
        },
        {
            value: 'editor',
            label: 'Editor',
        }
    ];
    
    const initialValues = {
        full_name: users.data  && users.data.full_name,
        username: users.data  && users.data.username,
        email: users.data  && users.data.email,
        role: users.data  && users.data.role,
    };

    const validate = Yup.object({
        full_name: Yup.string().required('Please Enter Full Name').max(100, 'Full Name must be 100 characters or less'),
        username: Yup.string().required('Please Enter Username'),
        email: Yup.string().email('Email must be a valid email-address').required('Please Enter Email-address'),
        role: Yup.string().required('Please Select Role'),
    });

    const handleSubmit = (values, formik) => {
        dispatch(updateUser({id:id, user:values}));
    }

    useEffect(() => {
        dispatch(editUser(id));
    }, [id]);

    useEffect(() => {
        if (users.success && users.message == 'User updated successfully') {
            setSuccess(true);
        }
    },[users]);
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
                                <CardTitle tag="h5">Edit User</CardTitle>
                                {/* <p className="card-category">Fill out all below fields.</p> */}
                            </CardHeader>
                            <CardBody>
                                {!isLoading ?
                                    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit} enableReinitialize={true}>
                                    {
                                        formik => {
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
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <Field type="email" name="email" className="form-control" placeholder="Enter Email" />
                                                            <ErrorMessage name="email" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="role">Role</label>
                                                            <Field as="select" name="role" className="form-control">
                                                                <option value="">Select Role</option>
                                                                {
                                                                    roles?.map?.((role, index) => {
                                                                        return (
                                                                            <option key={index} value={role.value}>{role.label}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </Field>
                                                            <ErrorMessage name="role" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <Field type="submit" className="btn btn-primary" value="Create User" />
                                                             {isLoading ? <div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div> : ''}
                                                        </div>
                                                    </Form>
                                                </>
                                            );
                                        }
                                    }
                                </Formik> : <Loader />}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="3" />
                </Row>
            </div>
        </>
    );
}

export default EditUser;