import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    history: [],
    sender_users: [],
    receiver_users: [],
    sender_userIsLoading:false,
    receiver_userIsLoading:false,
    isLoading:false,
};

const projects = createAsyncThunk('/chat-history/projects', async () => {
    try {
        const url = `/chat-history/projects`;
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const senderUsers = createAsyncThunk('chat-history/sender-users', async (id) => {
    try {
        const url = `/chat-history/project/${id}/users`;
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const receiverUsers = createAsyncThunk('chat-history/receiver-users', async (param) => {
    try {
        const url = `/chat-history/project/${param.sender}/${param.projectId}/users`;
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const chatHistorySlice = createSlice({ 
    name: "chatHistorySlice",
    initialState,
    reducers: {
        resetReceiverUsers: (state) => {
            state.receiver_users = [];
            state.receiver_userIsLoading = false;
        },
        resetStates: (state, action) => {
            state.sender_users = [];
            state.receiver_users = [];
            state.sender_userIsLoading = false;
            state.receiver_userIsLoading = false;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(projects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.history = action.payload;
        });
        builder.addCase(projects.pending, (state, action) => {
            state.isLoading = true;
            state.history = [];
        });
        builder.addCase(senderUsers.fulfilled, (state, action) => {
            state.sender_userIsLoading = false;
            state.sender_users = action.payload;
        });
        builder.addCase(senderUsers.pending, (state, action) => {
            state.sender_userIsLoading = true;
            state.sender_users = [];
        });
        builder.addCase(receiverUsers.fulfilled, (state, action) => {
            state.receiver_userIsLoading = false;
            state.receiver_users = action.payload;
        });
        builder.addCase(receiverUsers.pending, (state, action) => {
            state.receiver_userIsLoading = true;
            state.receiver_users = [];
        });
    }
});


export const { resetReceiverUsers,resetStates } = chatHistorySlice.actions;
export { projects,senderUsers,receiverUsers };
export default chatHistorySlice;