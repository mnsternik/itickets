import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import tasksRedcuder from './tasks';
import uiReducer from './ui';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksRedcuder,
        ui: uiReducer,
    }
});

export default store; 