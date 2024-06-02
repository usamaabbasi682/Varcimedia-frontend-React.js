import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import '../../config/axiosConfig';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const authentication = createAsyncThunk('/auth', async (input) => {
    try {
        const response = await axios({
            url: '/login',
            method: 'POST',
            data: {
                email: input.email,
                password:input.password
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(authentication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(authentication.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export { authentication };
export default loginSlice;