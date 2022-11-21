import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersData: {
        error: false,
        url: 'https://iticket-fd059-default-rtdb.firebaseio.com/users.json',
        users: []
    },
    groupsData: {
        error: false,
        url: 'https://iticket-fd059-default-rtdb.firebaseio.com/groups.json',
        groups: []
    },
};

const usersDataSlice = createSlice({
    name: 'usersData',
    initialState: initialState,
    reducers: {
        replaceUsers(state, action) {
            state.usersData = action.payload
        },
        replaceGroups(state, action) {
            state.groupsData = action.payload
        }
    }
});

export const fetchUsersData = () => {
    return async (dispatch) => {
        const fetchUsers = async () => {
            const response = await fetch(
                'https://iticket-fd059-default-rtdb.firebaseio.com/users.json'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            return data;
        };

        try {
            const usersData = await fetchUsers();
            const users = [];
            for (let userKey in usersData) {
                users.push(usersData[userKey]);
            }

            dispatch(usersActions.replaceUsers({ ...initialState.usersData, error: false, users: users }))
        } catch (error) {
            dispatch(usersActions.replaceUsers({ ...initialState.usersData, error: error, users: [] }))
        }
    };
};

export const fetchGroupsData = () => {
    return async (dispatch) => {
        const fetchGroups = async () => {
            const response = await fetch(
                'https://iticket-fd059-default-rtdb.firebaseio.com/groups.json'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch groups data');
            }

            const data = await response.json();
            return data;
        };

        try {
            const groupsData = await fetchGroups();
            const groups = [];

            for (let groupKey in groupsData) {
                groups.push(groupsData[groupKey]);
            }

            dispatch(usersActions.replaceGroups({ ...initialState.groupsData, error: false, groups: groups }))
        } catch (error) {
            dispatch(usersActions.replaceGroups({ ...initialState.groupsData, error: error, groups: [] }))
        };
    };
};

export const usersActions = usersDataSlice.actions;

export default usersDataSlice.reducer; 