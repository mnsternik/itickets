import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: null,
    userData: {
        uid: '',
        name: '',
        isAdmin: true,
        group: '',
        email: '',
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signOut(state) {
            state.isLoggedIn = false;
            console.log('signed out');
            state.userData = initialState.userData;
        },
        signIn(state, action) {
            state.isLoggedIn = true;
            console.log('signed in')
            state.userData = action.payload;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer; 