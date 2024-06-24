import React, { useState,useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledAlert } from "reactstrap";
import { admin, client, writer, editor } from "features/projectSlice";
import { Form, Formik, Field, ErrorMessage } from "formik"; 
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { editProject } from "features/projectSlice";
import { updateProject } from "features/projectSlice";
import useCheckLogin from "hooks/useCheckLogin";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProject = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projectStore);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const projRef = useRef(null);
    const navigate = useNavigate();

    const selectedUser = (data, role) => {
        const user = project?.projects?.data?.users?.find((user) => user.role === role);
        return user ? user.id : '';
    }

    const initialValues = {
        title: project?.projects && project?.projects?.data?.title,
        name: project?.projects && project?.projects?.data?.name,
        description: project?.projects && project?.projects?.data?.description,
        end_date: project?.projects && project?.projects?.data?.end_date_without_format,
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
        // file:Yup.string().required('Please Select File')
    });

    const handleSubmit = (values, formik) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('end_date', values.end_date);
        formData.append('status',values.status);
        formData.append('work_status',values.work_status);

        if (values.file.length > 0) {
            for (let i = 0; i < values.file.length; i++) {
                formData.append('file[]', values.file[i]);
            }   
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

        // formData.forEach((data)=>{console.log(data);});
        dispatch(updateProject({formData:formData,id:id}));
        projRef.current = formik;
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
    }, [id]);

    useEffect(() => {
        if (project?.updating) {
            projRef.current.setSubmitting(false);
            setSuccess(true);
        } else {
            projRef?.current?.setSubmitting(false);
        }
    },[project?.updating]);
    return (
        <>
            <div className="content">
                <Row>
                    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit} enableReinitialize={true}>
                        {
                            formik => {
                                return (
                                    <>
                                        <Col md="9">
                                            <Card>
                                                {project?.updating ?
                                                    <UncontrolledAlert color="success" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                                        User Created Successfully!
                                                    </UncontrolledAlert>: ''}
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
                                                        {!project?.isLoading ?
                                                            <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-md-5 d-flex">
                                                                    <Field type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-primary" name="btn_update" value="Update Project" /> &nbsp;
                                                                     <button type="button" onClick={() => navigate('/admin/projects') } className="btn btn-danger"><i className="fa fa-arrow-circle-left" /> Back</button>
                                                                </div>
                                                                <div className="col-md-3 mt-2">
                                                                    {project?.updating ? <div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : ''}
                                                    </Form>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md="3">
                                            <Card>
                                                <CardBody>
                                                    <div className="form-group">
                                                        <label htmlFor="file">Select File</label>
                                                        <Field type="file" value={undefined} onChange={(e)=>{formik.setFieldValue('file',e.target.files)}} accept='.pdf,.docx,.doc,.pptx,.xml,.txt' multiple name="file" className="form-control" />
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
                     
                </Row>
            </div>
        </>
    );
}

export default EditProject;