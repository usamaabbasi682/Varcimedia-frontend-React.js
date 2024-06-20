import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    isLoading: false,
    creating:false,
    updating: false,
    error: null,
};

const userLists = createAsyncThunk('/users', async (data) => {
    try {
        let url = '';
        if (data.search != null) {
            url = `/users?search=${data.search}`;
        } else {
            url = `/users?page=${data.page}`;
        }
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

const userCreate = createAsyncThunk('/users/create', async (user) => {
    try {
        const url = `/users`;
        const response = await axios({
            url: url,
            method: "POST",
            data: {
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
            },
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const editUser = createAsyncThunk('/users/edit', async (id) => {
    try {
        const url = `/users/${id}`;
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

const updateUser = createAsyncThunk('/users/update', async ({id,user}) => {
    try {
        const url = `/users/${id}`;
        const response = await axios({
            url: url,
            method: "PUT",
            data: {
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const deleteUserRow = createAsyncThunk('/users/delete', async (id) => {
    try {
        const url = `/users/${id}`;
        const response = await axios({
            url: url,
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
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
        builder.addCase(userCreate.fulfilled, (state, action) => {
            state.creating = false;
            state.users = action.payload;
        });
        builder.addCase(userCreate.pending, (state, action) => {
            state.creating = true;
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.updating = false;
            state.users = action.payload;
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.updating = true;
        });
        builder.addCase(deleteUserRow.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(deleteUserRow.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export { userLists, userCreate, editUser,updateUser,deleteUserRow };
export default userSlice;