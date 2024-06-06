import Loader from "components/Loader";
import Pagination from "components/Pagination/Pagination";
import { deleteUserRow } from "features/userSlice";
import { userLists } from "features/userSlice";
import useCheckLogin from "hooks/useCheckLogin";
import useToken from "hooks/useToken";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Card, CardHeader, CardBody,CardTitle, Row, Col, Table,UncontrolledAlert } from "reactstrap";

const Lists = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.userStore);
    const [page, setPage] = useState(1);
    const [success, setSuccess] = useState(false);
    const [search, setSearch] = useState('');

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUserRow(id));
            dispatch(userLists(page))
            setSuccess(true);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    useEffect(() => {
        dispatch(userLists(search,page))
    },[page,search]);
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <UncontrolledAlert color="danger" fade={false} isOpen={success} toggle={() => setSuccess(false)}>
                                User Deleted Successfully!
                            </UncontrolledAlert>
                            <CardHeader>
                                <div className="row pr-3 pl-3">
                                    <div className="col-md-10">
                                        <CardTitle tag="h5">All Users</CardTitle>
                                        <p className="card-category">All users are listed below</p>
                                    </div>
                                    <div className="col-md-2 text-right pt-2">
                                        <Link to="create" className="btn btn-dark btn-sm">Add User</Link>
                                        <input type="search" value={search} onChange={handleSearch} className="form-control form-control-sm" placeholder="Search" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>SR#</th>
                                            <th>Username</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th className="text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !isLoading ?
                                            users?.data?.map?.((user, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{user.id}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.full_name}</td>
                                                            <td>{user.email}</td>
                                                            <td className="text-secondary font-weight-bold">{user.role}</td>
                                                            <td className="text-right">
                                                                <Link to={`${user.id}/edit`} className="btn btn-success btn-sm">Edit</Link>
                                                                <button className="btn btn-danger btn-sm" onClick={() => { deleteUser(user.id); }} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                                : 
                                                <tr>
                                                    <td colSpan={6}>
                                                        <Loader />
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="text-right" colSpan={6}>
                                                <Pagination users={users} setPage={setPage} page={page} />
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Lists;