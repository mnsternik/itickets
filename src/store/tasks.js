import { createSlice } from "@reduxjs/toolkit";
//change name to ticketsData?? 

const initialState = {
    tasksData: {
        error: false,
        url: 'https://iticket-fd059-default-rtdb.firebaseio.com/tasks.json',
        tasks: []
    },
    categoriesData: {
        error: false,
        url: 'https://iticket-fd059-default-rtdb.firebaseio.com/categories.json',
        categories: []
    },
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
        replaceTasks(state, action) {
            state.tasksData = action.payload
        },
        replaceCategories(state, action) {
            state.categoriesData = action.payload
        }
    }
});

export const fetchCategoriesData = () => {
    return async (dispatch) => {
        const fetchCategories = async () => {
            const response = await fetch(
                'https://iticket-fd059-default-rtdb.firebaseio.com/categories.json'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            return data;
        };

        try {
            const categoriesData = await fetchCategories();
            const categories = [];
            for (let categorieKey in categoriesData) {
                categories.push(categoriesData[categorieKey]);
            }

            dispatch(tasksActions.replaceCategories({ ...initialState.categoriesData, error: false, categories: categories }))
        } catch (error) {
            dispatch(tasksActions.replaceCategories({ ...initialState.categoriesData, error: error, categories: [] }))
        }
    };
};

export const fetchTasksData = () => {
    return async (dispatch) => {
        const fetchTasks = async () => {
            const response = await fetch(
                'https://iticket-fd059-default-rtdb.firebaseio.com/tasks.json'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const data = await response.json();
            return data;
        };

        try {
            const tasksData = await fetchTasks();
            const tasks = [];

            for (let taskKey in tasksData) {
                tasks.push(tasksData[taskKey]);
            }

            dispatch(tasksActions.replaceTasks({ ...initialState.tasksData, error: false, tasks: tasks }))
        } catch (error) {
            dispatch(tasksActions.replaceTasks({ ...initialState.tasksData, error: error, tasks: [] }))
        };
    };
};

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer; 