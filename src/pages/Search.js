import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { readAllGroupsData, readAllUsersData, readCategoriesData } from '../lib/api';

import SearchOptionsForm from '../components/Search/SearchOptionsForm';

import { Box } from '@mui/system';


const Search = () => {

    const [allGroups, setAllGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    const priorities = useSelector(state => state.tasks.priorities);

    useEffect(() => {
        readAllGroupsData(setAllGroups);
        readAllUsersData(setAllUsers);
        readCategoriesData(setCategories);
    }, []);

    return (
        <Box>
            <SearchOptionsForm
                groups={allGroups}
                users={allUsers}
                priorities={priorities}
                categories={categories}
            />
        </Box>
    );
};

export default Search; 