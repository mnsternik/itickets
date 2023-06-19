import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null || localStorage.getItem('iticketsUid'),
    userData: {
        uid: '',
        name: '',
        group: '',
        email: '',
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signOut(state) {
            localStorage.removeItem('iticketsUid');
            state.isLoggedIn = false;
            state.token = null;
            state.userData = initialState.userData;
        },
        signIn(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.uid;
            state.userData = action.payload;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
