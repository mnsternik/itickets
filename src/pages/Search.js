import { useState, useEffect } from 'react';
import { readAllGroupsData, readAllTasksData, readAllUsersData, readCategoriesData } from '../lib/api';

import SearchOptionsForm from '../components/Search/SearchOptionsForm';

import { Stack } from '@mui/material';
import TasksTable from '../components/TasksTable/TasksTable';


const Search = () => {

    const [allGroups, setAllGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current group', 'Modification date'];

    useEffect(() => {
        readAllGroupsData(setAllGroups);
        readAllUsersData(setAllUsers);
        readCategoriesData(setCategories);
        readAllTasksData(setAllTasks);
    }, []);


    const searchWordsInString = (wordsStr, string) => {
        const wordsArr = wordsStr.toLowerCase().split(' ');
        const str = string.toLowerCase();

        let score = 0;
        wordsArr.forEach(word => {
            if (str.includes(word)) {
                score++
            }
        })

        // all searched words must be included in result 
        if (score === wordsArr.length) {
            return true;
        }

        return false;
    };


    const searchTasksWithParams = (searchParams) => {
        let tasks = structuredClone(allTasks);
        const searchParamsKeys = [];

        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                searchParamsKeys.push(key)
            }
        }

        searchParamsKeys.forEach(key => {
            tasks = tasks.filter(task => {
                if (key === 'title' || key === 'description') {
                    return searchWordsInString(searchParams[key], task[key])
                }
                return searchParams[key] === task[key]
            })
        })

        setFilteredTasks(tasks);
    };


    return (
        <Stack spacing={3}>
            <SearchOptionsForm
                groups={allGroups}
                users={allUsers}
                categories={categories}
                onSearchSubmit={searchTasksWithParams}
            />

            <TasksTable
                tasks={filteredTasks}
                labels={labels}
                noTasksMessage='Change search paramaters to see results'
            />

        </Stack>
    );
};

export default Search; 