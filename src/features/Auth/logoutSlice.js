import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const logout = createAsyncThunk('/logout', async () => {
    try {
        const response = await axios({
            url: '/logout',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });  
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const logoutSlice = createSlice({
    name: 'logoutSlice',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
            state.data = [];
        });
    }
});

export { logout };
export default logoutSlice;