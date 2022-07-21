import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
    username: 'MS',
    isAdmin: true,
    group: 'Helpdesk',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer; 