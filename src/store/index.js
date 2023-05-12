import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import tasksRedcuder from './tasks';
import uiReducer from './ui';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: tasksRedcuder,
    ui: uiReducer,
})

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         tasks: tasksRedcuder,
//         ui: uiReducer,
//     }
// });

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

//export default store; 