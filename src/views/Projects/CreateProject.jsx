import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { admin, client, writer, editor, resetProjectStore, createProject } from "features/projectSlice";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledAlert, Button } from "reactstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCheckLogin from "hooks/useCheckLogin";
import * as Yup from 'yup';

const CreateProject = () => {
    useCheckLogin();
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const roles = useSelector((state) => state.projectStore);
    const projRef = useRef(null);
    const navigate = useNavigate();

    const initialValues = {
        title:'',
        name: '',
        description: '',
        end_date: '',
        file: '',
        admin: '',
        client: '',
        writer: '',
        editor:'',
    };
    const validate = Yup.object({
        title: Yup.string().required('Please Enter Title').max(100, 'Full Name must be 100 characters or less'),
        name: Yup.string().required('Please Enter Name').max(100,'Name must be 100 characters or less'),
        description: Yup.string().required('Please Enter Description'),
        end_date: Yup.string().required('Please Select End-Date'),
        file:Yup.string().required('Please Select File')
    });

    const handleSubmit = (values, formik) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('end_date', values.end_date);
        
        for (let i = 0; i < values.file.length; i++) {
            formData.append('file[]', values.file[i]);
        }

        const projectUser = [];
        if (values.admin != '') {
            projectUser.push(values.admin);
        }
        if (values.client != '') {
            projectUser.push(values.client);
        }
        if (values.writer != '') {
            projectUser.push(values.writer);
        }
        if (values.editor != '') {
            projectUser.push(values.editor);
        }

        if (projectUser.length != 0) {
            projectUser.forEach(id => {
                formData.append('associate_users[]', id);
            });
        }
        console.log(values);
        dispatch(createProject(formData));
        projRef.current = formik;
    }
    useEffect(() => {
        dispatch(admin());
        dispatch(client());
        dispatch(writer());
        dispatch(editor());
    }, []);
    
    useEffect(() => {
        if (roles?.projects?.success) {
            if (projRef.current != null) {
                projRef.current.setSubmitting(false);
                projRef.current.resetForm();
                setSuccess(true);
                dispatch(resetProjectStore());
                dispatch(admin());dispatch(client());
                dispatch(writer());dispatch(editor());
            }
        } else {
            if (projRef.current != null) {
                projRef.current.setSubmitting(false);
            }
        }

    }, [roles?.creating]);

    return (
        <>
            <div className="content">
                <Row>
                    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit}>
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
                                                    <CardTitle tag="h5">Add New Project</CardTitle>
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
                                                            <ReactQuill theme="snow" style={{ height:"100px" }} name="description" value={formik.values.description} onChange={value => formik.setFieldValue('description', value)} />
                                                        </div>
                                                        <div className="form-group mt-5">
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
                                                                            roles?.admins?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={val.id}>{ val.full_name}</option>
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
                                                                            roles?.clients?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={val.id}>{ val.full_name}</option>
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
                                                                            roles?.writers?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={val.id}>{ val.full_name}</option>
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
                                                                            roles?.editors?.data?.map?.((val, key) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={val.id}>{ val.full_name}</option>
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
                                                            <div className="row">
                                                                <div className="col-md-4 d-flex">
                                                                    <Field type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-primary" name="btn_create" value="Create Project" />
                                                                    <Button type="button" onClick={() => navigate('/admin/projects') } className="btn btn-danger"><i className="fa fa-arrow-circle-left" /> Back</Button>
                                                                </div>
                                                                <div className="col-md-3 mt-3">
                                                                   {roles.creating ? <div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div> : ''}
                                                                </div>
                                                            </div>
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
                                                        <Field type="file" multiple accept='.pdf,.docx,.doc,.pptx,.xml,.txt'  onChange={(e) => {formik.setFieldValue('file',e.target.files)}} value={undefined} name="file" className="form-control" />
                                                        <ErrorMessage name="file"component="span" className="text-danger" />
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
                                        </Col>
                                    </>
                                );
                            }
                        }
                    </Formik>
                </Row>
            </div>
        </>
    );
}

export default CreateProject;