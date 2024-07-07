import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    projects: [],
    isLoading: false,
    creating:false,
    updating: false,
    projectUPdateData: [],
    admins:[],
    clients:[],
    writers:[],
    editors:[],
};

const projectLists = createAsyncThunk('/projects', async (data) => {
    try {
        var url = ''
        if (data.search != null) {
            url = `/projects?search=${data.search}&insight=${data.insight}`;
        } else if (data.work_status != null) {
            url = `/projects?work_status=${data.work_status}&insight=${data.insight}`;
        } else {
            url = `/projects?page=${data.page}&insight=${data.insight}`;
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

const myProjectLists = createAsyncThunk('/my-projects', async (data) => {
    try {
        var url = ''
        if (data.search != null) {
            url = `/my-projects?search=${data.search}`;
        } else {
            url = `/my-projects?page=${data.page}`;
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

const viewProject = createAsyncThunk('/projects/view', async (id) => {
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

const updateProject = createAsyncThunk('/project/update', async (data) => {
    try {
        const url = `/projects/${data.id}?_method=PUT`;
        const response = await axios({
            url: url,
            method: "POST",
            data:data.formData,
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

const deleteProjectFile = createAsyncThunk('/projects/file/delete', async (id) => {
    try {
        const url = `/file/${id}/remove`;
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
        builder.addCase(myProjectLists.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        });
        builder.addCase(myProjectLists.pending, (state, action) => {
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
        builder.addCase(viewProject.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        });
        builder.addCase(viewProject.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.projectUPdateData = action.payload;
            state.updating = false;
        });
        builder.addCase(updateProject.pending, (state, action) => {
            state.updating = true;
        });
        builder.addCase(deleteProjectFile.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        });
        builder.addCase(deleteProjectFile.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export const { resetProjectStore } = projectSlice.actions;
export { projectLists,admin,client,writer,editor,createProject,deleteProjectRow,editProject,updateProject,deleteProjectFile,myProjectLists,viewProject };
export default projectSlice;