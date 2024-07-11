import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    chats: [],
    chatsLoading: false,
    isLoading: false,
    chat: [],
};

const getChats = createAsyncThunk('/chat/load', async (data) => {
    try {
        const url = `/chat/load/${data.sender_id}/${data.receiver_id}/${data.project_id}`;
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    }catch (error) {
        return error.response;
    }
});

const saveMessage = createAsyncThunk('/chat/save', async (data) => {
    try {
        const url = `/chat/save-message`;
        const response = await axios({
            url: url,
            method: "POST",
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    }catch (error) {
        return error.response;
    }
});

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        resetChats: (state) => {
            state.chats = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveMessage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(saveMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chat = action.payload;
        });
        builder.addCase(getChats.pending,(state) => {
            state.chatsLoading = true;
        });
        builder.addCase(getChats.fulfilled,(state, action) => {
            state.chatsLoading= false;
            state.chats = action.payload;
        });
    }
});

export const { resetChats } = chatSlice.actions;
export { saveMessage,getChats };
export default chatSlice;