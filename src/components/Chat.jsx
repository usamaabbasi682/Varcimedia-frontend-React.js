import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "features/chatSlice";
import { getChats } from "features/chatSlice";
import SkeletonLoader from "./SkeletonLoader";

const Chat = ({ chatUsers, loading,project_id }) => {
    const dispatch = useDispatch();
    const {chat,isLoading,chats,chatsLoading} = useSelector((state) => state.chatStore);
    const [activeUser, setActiveUser] = useState(null);
    const [sender, setSender] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [messages, setMessages] = useState('');

    const handleActiveUser = (id) => {
        setActiveUser(id);
        setReceiver(id);
        dispatch(getChats({sender_id:sender,receiver_id:id,project_id:project_id}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveMessage({sender_id:sender,receiver_id:receiver,project_id:project_id,message:messages}));
    }

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setSender(user?.id);
    }, []);

    useEffect(() => {
        if (chat?.success) {
            setMessages('');
        } 
    }, [chat]);
    return (
        <>
            <div className="container py-5 px-4">
                <div className="row rounded-lg overflow-hidden shadow">
                    <div className="col-5 px-0">
                        <div className="bg-white">
                        <div className="bg-gray px-4 py-2 bg-light">
                            <p className="h5 mb-0 py-1">Recent Chat</p>
                        </div>
                        <div className="messages-box">
                                <div className="list-group rounded-0">
                                    {!loading ?
                                    chatUsers?.map?.((user, index) => {
                                        return (
                                            <>
                                                <a onClick={()=>handleActiveUser(user.id)} key={index} className={`list-group-item list-group-item-action list-group-item-light rounded-0 ${activeUser === user.id ? 'active' : ''}`}>
                                                    <div className="media">
                                                        <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width={50} className="rounded-circle" />
                                                        <div className="media-body ml-4">
                                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                                <h6 className="mb-0">{user.full_name}  <span style={{ fontSize:'10px',color:'#bdbdbd' }}>{user.role}</span></h6>
                                                                <small className="small font-weight-bold">25 Dec</small>
                                                            </div>
                                                            <p className="font-italic mb-0 text-small">
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </>
                                        );
                                    }): <Loader/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7 px-0">
                        <div className="px-4 py-5 chat-box bg-white">
                            {
                                activeUser != null ?
                                !chatsLoading ?  
                                chats?.data?.map?.((chat, index) => {
                                    return (
                                        <>
                                            {chat.sender_id === sender ?
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
                                    );
                                }) : <SkeletonLoader />
                                    : <div className="text-center" style={{ position:'absolute',top:'40%',left:'50%',transform:'translate(-40%,-50%)' }}><i style={{ fontSize:'100px',color:'#d5d5d5' }} className="fa fa-comments" /></div>
                            }
                        </div>
                        <form onSubmit={handleSubmit} className="bg-light">
                            <div className="input-group">
                                <input type="text" disabled={activeUser == null} placeholder="Type a message" value={messages} onChange={(e)=>setMessages(e.target.value)} className="form-control rounded-0 border-0 bg-light" />
                                <div className="input-group-append">
                                    <button disabled={isLoading || activeUser == null} id="button-addon2" type="submit" className="btn btn-link text-primary">
                                        {!isLoading ? <i className="fa fa-paper-plane" /> :
                                        <div className="spinner-border" role="status" style={{ width: '1rem', height: '1rem' }}>
                                            <span className="sr-only">Loading...</span>
                                        </div>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;