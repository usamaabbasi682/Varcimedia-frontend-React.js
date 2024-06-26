import { configureStore } from '@reduxjs/toolkit';
import loginSlice from 'features/Auth/loginSlice';
import chatSlice from 'features/chatSlice';
import projectSlice from 'features/projectSlice';
import userSlice from 'features/userSlice';

const store = configureStore({
    reducer: {
        'authStore': loginSlice.reducer,
        'userStore': userSlice.reducer,
        'projectStore': projectSlice.reducer,
        'chatStore': chatSlice.reducer
    }
});

export default store;