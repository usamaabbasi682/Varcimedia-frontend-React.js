import { receiverUsers } from 'features/chatHistorySlice';
import { senderUsers } from 'features/chatHistorySlice';
import { projects } from 'features/chatHistorySlice';
import { getChats } from 'features/chatSlice';
import useCheckLogin from 'hooks/useCheckLogin';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledAlert } from "reactstrap";
import SkeletonLoader from '../../components/SkeletonLoader';
import { resetReceiverUsers } from 'features/chatHistorySlice';
import { resetStates } from 'features/chatHistorySlice';
import { resetChats } from 'features/chatSlice';


const Loader = () => {
    return (
        <>
            <div className="text-center">
                <div className="spinner-border mt-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
}

const History = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const { history, isLoading, sender_users, sender_userIsLoading, receiver_users, receiver_userIsLoading } = useSelector((state) => state.chatHistoryStore);
    const { chatsLoading, chats} = useSelector((state) => state.chatStore);
    const [sender, setSender] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [senderVisiable, setSenderVisiable] = useState(false);
    const [receiverVisiable, setReceiverVisiable] = useState(false);
    const [receiver, setReceiver] = useState(null);

    const handleProject = (e) => {
        if (e.target.value != '') {
            const projectId = e.target.value;
            setProjectId(projectId);
            dispatch(senderUsers(projectId));
        }
    }

    const handleSender = (e) => {
        const sender = e.target.value;
        setSender(e.target.value);
        dispatch(receiverUsers({sender,projectId}));
        setSenderVisiable(true);
        setReceiverVisiable(false);
    }
    const handleReceiver = (e) => {
        const receiver = e.target.value;
        setReceiver(receiver);
        setReceiverVisiable(true);
        dispatch(getChats({ sender_id: sender, receiver_id: receiver, project_id: projectId }));
    }

    const handleSenderButton = (e) => {
        e.preventDefault();
        setSenderVisiable(false);
        dispatch(senderUsers(sender));
        dispatch(resetReceiverUsers());
        setReceiver(null);
    }

    const handleReceiverButton = (e) => {
        e.preventDefault();
        setReceiverVisiable(false);
        dispatch(receiverUsers({ sender, projectId }));
    }

    const handleSwipe = () => {
        setReceiver(sender);
        setSender(receiver);
    }
    const resetAll = () => {
        dispatch(resetStates());
        dispatch(resetChats());
        setSender(null);
        setReceiver(null);
    }

    useEffect(() => {
        dispatch(projects());
    }, []);
    
    return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Review Previous Conversations</CardTitle>
                                <p className="card-category">Easily revisit and review past conversations to keep track of important discussions.</p>
                            </CardHeader>
                        <CardBody className='border p-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <label for="project">Projects</label>
                                    <select disabled={isLoading} className="form-control" name="project" onChange={handleProject}>
                                        <option value="">Select Project</option>
                                        {
                                            history?.data?.map?.((project, index) => {
                                                return (
                                                    <>
                                                        <option value={project.id}>{ project.name }</option>
                                                    </>
                                                );
                                            })
                                        }
                                    </select>    
                                </div>
                                <div className="col-md-8 text-right">
                                {sender != null && receiver != null ?                                
                                    <>
                                        <div className="col-md-12 text-right mt-3">
                                            <button type="button" onClick={resetAll} className="btn btn-sm btn-dark">Reset All</button>
                                        </div>
                                </>: ''}
                                </div>
                                {sender_users?.data?.length > 0 ?                                
                                    <>
                                         <div className="col-md-10">
                                            <h4>Sender User</h4>
                                        </div>
                                        <div className="col-md-2 text-right mt-3">
                                            <button type="button" onClick={handleSenderButton} className="btn btn-sm btn-dark"><i className='nc-icon nc-refresh-69'></i></button>
                                        </div>
                                    </> : ''}
                                {!sender_userIsLoading ? sender_users?.data?.map?.((user,index) => {
                                    return (
                                        <>
                                            <div className="col-md-3">
                                                <div className="form-group d-flex p-2 rounded" style={{ backgroundColor:'#ebebeb' }}>
                                                    <input type="checkbox" name="users" disabled={senderVisiable} value={user.id} onChange={handleSender} /> &nbsp;
                                                        <label for="users" className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>{user.full_name}</label>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }):<div className='col-md-4'><Loader /></div>}
                                {receiver_users?.data?.length > 0 ?                                
                                    <>
                                         <div className="col-md-10">
                                            <h4>Receiver User</h4>
                                        </div>
                                        <div className="col-md-2 text-right mt-3">
                                            <button type="button" onClick={handleReceiverButton} className="btn btn-sm btn-dark"><i className='nc-icon nc-refresh-69'></i></button>
                                        </div>
                                </>: ''}
                                {!receiver_userIsLoading ? receiver_users?.data?.map?.((user,index) => {
                                    return (
                                        <>
                                            <div className="col-md-3">
                                                <div className="form-group d-flex p-2 rounded" style={{ backgroundColor:'#ebebeb' }}>
                                                    <input type="checkbox" name="users" disabled={receiverVisiable} value={user.id} onChange={handleReceiver} /> &nbsp;
                                                        <label for="users" className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>{user.full_name}</label>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }) : <div className='col-md-4'><Loader /></div>}
                                {sender != null && receiver != null ?                                
                                    <>
                                        <div className="col-md-12 text-right mt-3">
                                            <button type="button" onClick={handleSwipe} className="btn btn-sm btn-dark">Swipe Users</button>
                                        </div>
                                </>: ''}
                            </div>
                        </CardBody>
                        </Card>
                    </Col>
            </Row>
                  <div className="row rounded-lg overflow-hidden shadow">
                    <div className="col-12 px-0">
                        <div className="px-4 py-5 chat-box bg-white">
                        {
                            chats?.data?.length > 0 ?
                                !chatsLoading ?  
                                chats?.data?.map?.((chat, index) => {
                                    if (chat.sender_id == sender) {
                                        return (
                                            <>
                                                 <div className="media w-50 ml-auto mb-3">
                                                    <div className="media-body">
                                                        <div className="bg-primary rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-white"> {chat.message} </p>
                                                        </div>
                                                        <p className="small text-muted">{chat.created_at}</p>
                                                    </div>
                                                </div> 
                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                   <div className="media w-50 mb-3">
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                        <div className="media-body ml-3">
                                                            <div className="bg-light rounded py-2 px-3 mb-2">
                                                                <p className="text-small mb-0 text-muted"> {chat.message} </p>
                                                            </div>
                                                            <p className="small text-muted">{chat.created_at}</p>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    }
                                    {/* return (
                                        <>
                                            {chat.sender_id === '1' ?
                                                <div className="media w-50 ml-auto mb-3">
                                                    <div className="media-body">
                                                        <div className="bg-primary rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-white"> {chat.message} </p>
                                                        </div>
                                                        <p className="small text-muted">{chat.created_at}</p>
                                                    </div>
                                                </div> :
                                                <div className="media w-50 mb-3">
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                        <div className="media-body ml-3">
                                                            <div className="bg-light rounded py-2 px-3 mb-2">
                                                                <p className="text-small mb-0 text-muted"> {chat.message} </p>
                                                            </div>
                                                            <p className="small text-muted">{chat.created_at}</p>
                                                    </div>
                                                </div>}
                                        </>
                                    ); */}
                                }) : <SkeletonLoader />
                                : <div className="text-center text">No chats yet</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default History; 