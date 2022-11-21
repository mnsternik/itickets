import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkModeEnabled: true,
    showSidebar: true,
    isSidebarPernament: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkModeEnabled = !state.isDarkModeEnabled;
        },
        toggleSidebar(state) {
            state.showSidebar = !state.showSidebar;
        },
        toggleIsSidebarPernamet(state) {
            state.isSidebarPernament = !state.isSidebarPernament;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer; 