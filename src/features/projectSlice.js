import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    projects: [],
    isLoading: false,
    creating:false,
    admins:[],
    clients:[],
    writers:[],
    editors:[],
};

const projectLists = createAsyncThunk('/projects', async (data) => {
    try {
        console.log(data);
        var url = ''
        if (data.search != null) {
            url = `/projects?search=${data.search}`;
        } else {
            url = `/projects?page=${data.page}`;
        } 
        
        const response = await axios({
            url:url,
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

const admin = createAsyncThunk('/admins', async () => {
    try {
        const url = "/role/admin";
        const response = await axios({
            url:url,
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

const client = createAsyncThunk('/clients', async () => {
    try {
        const url = "/role/client";
        const response = await axios({
            url:url,
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

const writer = createAsyncThunk('/writers', async () => {
    try {
        const url = "/role/writer";
        const response = await axios({
            url:url,
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

const editor = createAsyncThunk('/editors', async () => {
    try {
        const url = "/role/editor";
        const response = await axios({
            url:url,
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

const createProject = createAsyncThunk('/project/create', async (project) => {
    try {
        const url = `/projects`;
        const response = await axios({
            url: url,
            method: "POST",
            data:project,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spa_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const editProject = createAsyncThunk('/projects/edit', async (id) => {
    try {
        const url = `/projects/${id}`;
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

const deleteProjectRow = createAsyncThunk('/projects/delete', async (id) => {
    try {
        const url = `/projects/${id}`;
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

const projectSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        resetProjectStore: (state, action) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(projectLists.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        });
        builder.addCase(projectLists.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(admin.fulfilled, (state, action) => {
            state.admins = action.payload;
            state.isLoading = false;
        });
        builder.addCase(admin.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(client.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.isLoading = false;
        });
        builder.addCase(client.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(writer.fulfilled, (state, action) => {
            state.writers = action.payload;
            state.isLoading = false;
        });
        builder.addCase(writer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editor.fulfilled, (state, action) => {
            state.editors = action.payload;
            state.isLoading = false;
        });
        builder.addCase(editor.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.creating = false;
        });
        builder.addCase(createProject.pending, (state, action) => {
            state.creating = true;
        });
        builder.addCase(deleteProjectRow.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        });
        builder.addCase(deleteProjectRow.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editProject.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        });
        builder.addCase(editProject.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export const { resetProjectStore } = projectSlice.actions;
export { projectLists,admin,client,writer,editor,createProject,deleteProjectRow,editProject };
export default projectSlice;