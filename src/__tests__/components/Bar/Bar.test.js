import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Bar from '../../../components/Bar/Bar';

describe('Bar component', () => {

    const initialState = {
        auth: {
            userData: {
                name: 'John Doe'
            }
        }
    };

    let mockStore;
    beforeEach(() => {
        mockStore = configureStore(initialState);
    });

    test('should display correct username from Redux store', () => {
        render(
            <Provider store={mockStore()}>
                <Bar />
            </Provider>
        )
        const loggedUserInfo = screen.getByText(`Logged as ${initialState.auth.userData.name}`, { exact: false })
        expect(loggedUserInfo).toBeInTheDocument();
    });
});