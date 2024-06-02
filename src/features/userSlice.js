import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

const userLists = createAsyncThunk('/users', async (page) => {
    try {
        const url = `/users?page=${page}`;
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                'Authorization':`Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(userLists.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(userLists.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export { userLists };
export default userSlice;