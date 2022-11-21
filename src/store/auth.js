import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
    username: 'user1',
    isAdmin: true,
    group: 'Helpdesk',
    mail: 'testmail@test.pl'
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer; 