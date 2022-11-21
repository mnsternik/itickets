import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import tasksRedcuder from './tasks';
import uiReducer from './ui';
import usersReducer from './users';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksRedcuder,
        ui: uiReducer,
        users: usersReducer,
    }
});

export default store; 