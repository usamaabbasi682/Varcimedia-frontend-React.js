import Loader from "components/Loader";
import Pagination from "components/Pagination/Pagination";
import { userLists } from "features/userSlice";
import useToken from "hooks/useToken";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody,CardTitle, Row, Col, Table } from "reactstrap";

const Lists = () => {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.userStore);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(userLists(page))
    },[page]);
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">All Users</CardTitle>
                                <p className="card-category">
                                    All users are listed below
                                </p>
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
                                            users?.data?.map((user, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{user.id}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.full_name}</td>
                                                            <td>{user.email}</td>
                                                            <td className="text-secondary font-weight-bold">{user.role}</td>
                                                            <td className="text-right">
                                                                <button className="btn btn-success btn-sm">Edit</button>
                                                                <button className="btn btn-danger btn-sm">Delete</button>
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