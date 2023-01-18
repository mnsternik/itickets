import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    priorities: [
        { name: '1 - Low', value: 1 },
        { name: '2 - Medium', value: 2 },
        { name: '3 - High', value: 3 },
        { name: '4 - Very high', value: 4 }
    ]
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        replacePriorities(state, action) {
            state.priorities = action.payload
        },
    }
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer; 