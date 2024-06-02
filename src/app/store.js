import { configureStore } from '@reduxjs/toolkit';
import loginSlice from 'features/Auth/loginSlice';

const store = configureStore({
    reducer: {
        'authStore' : loginSlice.reducer,
    }
});

export default store;