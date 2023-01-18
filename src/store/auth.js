import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null || localStorage.getItem('iticketsUid'),
    userData: {
        uid: '',
        name: '',
        isAdmin: false,
        group: '',
        email: '',
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signOut(state) {
            console.log('redux auth.js signOut called');
            localStorage.removeItem('iticketsUid');
            state.isLoggedIn = false;
            state.token = null;
            state.userData = initialState.userData;
        },
        signIn(state, action) {
            console.log('redux auth.js signIn called');
            state.isLoggedIn = true;
            state.token = action.payload.uid;
            state.userData = action.payload;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

/*
    isLoggedIn: true,
    userData: {
    uid: '4Eqfr2LNEjaZWo9WyQMPKKUa3zy1',
    name: 'Marcin Sternik',
    isAdmin: true,
    group: 'Helpdesk',
    email: 'mnsternik@gmail.com',
    }
*/