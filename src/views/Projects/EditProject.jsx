import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledAlert } from "reactstrap";
import { admin, client, writer, editor } from "features/projectSlice";
import { Form, Formik, Field, ErrorMessage } from "formik"; 
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { editProject } from "features/projectSlice";
import Loader from "components/Loader";

const EditProject = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projectStore);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();

    const selectedUser = (data, role) => {
        const user = project?.projects?.data?.users?.find((user) => user.role === role);
        return user ? user.id : '';
    }

    const initialValues = {
        title: project?.projects && project?.projects?.data?.title,
        name: project?.projects && project?.projects?.data?.name,
        description: project?.projects && project?.projects?.data?.description,
        end_date: '1975-07-16 20:31:00',
        status: project?.projects && project?.projects?.data?.status,
        work_status: project?.projects && project?.projects?.data?.work_status,
        file: '',
        admin: project?.projects && selectedUser(project?.projects?.data?.users,'admin'),
        client: project?.projects && selectedUser(project?.projects?.data?.users,'client'),
        writer: project?.projects && selectedUser(project?.projects?.data?.users,'writer'),
        editor:project?.projects && selectedUser(project?.projects?.data?.users,'editor'),
    };

    const validate = Yup.object({
        title: Yup.string().required('Please Enter Title').max(100, 'Full Name must be 100 characters or less'),
        name: Yup.string().required('Please Enter Name').max(100,'Name must be 100 characters or less'),
        description: Yup.string().required('Please Enter Description'),
        end_date: Yup.string().required('Please Select End-Date'),
        status: Yup.string().required('Please Select Status'),
        work_status: Yup.string().required('Please Select Work Status'),
        file:Yup.string().required('Please Select File')
    });

    const handleSubmit = (values, formik) => {

    }

    const status = [
        {label:'Publish',value:'publish'},
        {label:'Pending',value:'pending'}
    ];
    const workStatus = [
        {label:'Completed',value:'completed'},
        {label:'Pending',value:'pending'}
    ];

    useEffect(() => {
        dispatch(editProject(id));
        dispatch(admin());
        dispatch(client());
        dispatch(writer());
        dispatch(editor());
    }, []);
    return (
        <>
            <div className="content">
                <Row>
                    {!project?.isLoading ? 
                    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit} enableReinitialize={true}>
                        {
                            formik => {
                                return (
                                    <>
                                        <Col md="9">
                                            <Card>
                                                <UncontrolledAlert color="success" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                                    User Created Successfully!
                                                </UncontrolledAlert>
                                                <CardHeader>
                                                    <CardTitle tag="h5">Edit Project</CardTitle>
                                                    {/* <p className="card-category">Fill out all below fields.</p> */}
                                                </CardHeader>
                                                <CardBody>
                                                    <Form>
                                                        <div className="form-group">
                                                            <label htmlFor="title">Title</label>
                                                            <Field type="text" name="title" className="form-control" placeholder="Enter Title" />
                                                            <ErrorMessage name="title" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name</label>
                                                            <Field type="text" name="name" className="form-control" placeholder="Enter Name" />
                                                            <ErrorMessage name="name" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <Field as="textarea" name="description" className="form-control" placeholder="Enter Description" />
                                                            <ErrorMessage name="description" component="span" className="text-danger" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12"><label>Associate Users</label></div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="admin">Admin</label>
                                                                    <Field as="select" name="admin" className="form-control">
                                                                        <option value="">Select Admin</option>
                                                                        {
                                                                            project?.admins?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option key={key} value={val.id}>{ val.full_name}</option>
                                                                                    </>
                                                                                );
                                                                            })
                                                                        }
                                                                    </Field>
                                                                    <ErrorMessage name="admin" component="span" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="client">Client</label>
                                                                    <Field as="select" name="client" className="form-control">
                                                                        <option value="">Select client</option>
                                                                         {
                                                                            project?.clients?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option key={key} value={val.id}>{ val.full_name}</option>
                                                                                    </>
                                                                                );
                                                                            })
                                                                        }
                                                                    </Field>
                                                                    <ErrorMessage name="client" component="span" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="writer">Writer</label>
                                                                    <Field as="select" name="writer" className="form-control">
                                                                        <option value="">Select Writer</option>
                                                                        {
                                                                            project?.writers?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option key={key} value={val.id}>{ val.full_name}</option>
                                                                                    </>
                                                                                );
                                                                            })
                                                                        }
                                                                    </Field>
                                                                    <ErrorMessage name="writer" component="span" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="editor">Editor</label>
                                                                    <Field as="select" name="editor" className="form-control">
                                                                        <option value="">Select Editor</option>
                                                                        {
                                                                            project?.editors?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option key={key} value={val.id}>{ val.full_name}</option>
                                                                                    </>
                                                                                );
                                                                            })
                                                                        }
                                                                    </Field>
                                                                    <ErrorMessage name="editor" component="span" className="text-danger" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <Field type="submit" disabled={!formik.isValid} className="btn btn-primary" name="btn_create" value="Create Project" />
                                                        </div>
                                                    </Form>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md="3">
                                            <Card>
                                                <CardBody>
                                                    <div className="form-group">
                                                        <label htmlFor="file">Select File</label>
                                                        <Field type="file" multiple name="file" className="form-control" />
                                                        <ErrorMessage name="file" component="span" className="text-danger" />
                                                    </div>
                                                    
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                    <div className="form-group">
                                                        <label htmlFor="end_date">End Date</label>
                                                        <Field type="datetime-local" name="end_date" className="form-control" />
                                                        <ErrorMessage name="end_date" component="span" className="text-danger" />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                    <div className="form-group">
                                                        <label htmlFor="file">Status</label> <br/>
                                                        {
                                                            status?.map?.((val, key) => {
                                                                return (
                                                                    <>
                                                                        <div className="d-flex">
                                                                            <Field type="radio" className="mt-0" name="status" value={val.value} /> &nbsp;
                                                                            <label style={{ marginTop:'6px' }}  htmlFor="status">{val.label}</label> <br/>
                                                                        </div>
                                                                    </>
                                                                );
                                                            })
                                                        }
                                                        <ErrorMessage name="status" component="span" className="text-danger" />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                    <div className="form-group">
                                                        <label htmlFor="work_status">Work Status</label> <br/>
                                                        {
                                                            workStatus?.map?.((val, key) => {
                                                                return (
                                                                    <>
                                                                        <div className="d-flex">
                                                                            <Field type="radio" className="mt-0" name="work_status" value={val.value} /> &nbsp;
                                                                            <label style={{ marginTop:'6px' }} htmlFor="work_status">{val.label}</label> <br/>
                                                                        </div>
                                                                    </>
                                                                );
                                                            })
                                                        }
                                                        <ErrorMessage name="work_status" component="span" className="text-danger" />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </>
                                );
                            }
                        }
                    </Formik>
                        : <Col md="12"><Card><CardHeader><CardTitle tag="h5">Edit Project</CardTitle></CardHeader><CardBody><Loader /></CardBody></Card></Col>
                    }
                </Row>
            </div>
        </>
    );
}

export default EditProject;