import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// As a basic setup, import your same slice reducers
import authReducer from './../store/auth';
import tasksReducer from './../store/tasks';
import uiReducer from './../store/ui';

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                auth: authReducer,
                tasks: tasksReducer,
                ui: uiReducer
            }, preloadedState
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}