import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    dashboard: [],
    isLoading: false,
};

const dashboardData = createAsyncThunk('/dashboard', async (data) => {
    try {
        var url = '';
        if (data.page != null) {
            url = `/dashboard?page=${data.page}`;
        } else {
            url = "/dashboard";
        }
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
const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(dashboardData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(dashboardData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dashboard = action.payload;
        });
        builder.addCase(dashboardData.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});

export { dashboardData };
export default dashboardSlice;