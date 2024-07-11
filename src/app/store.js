import { configureStore } from '@reduxjs/toolkit';
import loginSlice from 'features/Auth/loginSlice';
import chatHistorySlice from 'features/chatHistorySlice';
import chatSlice from 'features/chatSlice';
import dashboardSlice from 'features/dashboardSlice';
import projectSlice from 'features/projectSlice';
import userSlice from 'features/userSlice';

const store = configureStore({
    reducer: {
        'authStore': loginSlice.reducer,
        'userStore': userSlice.reducer,
        'projectStore': projectSlice.reducer,
        'chatStore': chatSlice.reducer,
        'dashboardStore': dashboardSlice.reducer,
        'chatHistoryStore': chatHistorySlice.reducer
    }
});

export default store;