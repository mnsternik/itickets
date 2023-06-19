import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { readAllGroupsData, readCategoriesData, deleteCategory, deleteGroup } from '../lib/api';

import GroupsList from '../components/ManageData/Groups/GroupsList';
import NewGroupForm from '../components/ManageData/Groups/NewGroupForm';

import { Paper, Typography, Stack } from '@mui/material';

const ManageData = () => {

    const location = useLocation();
    const { pathname } = location;

    initDataManageState = {
        dataType: '', //groups, categories (and users?)
        title: '',
        tableColumns: [],
        tableData: [],
        onDeleteItem: 'some function',
        onAddItem: 'some function',
    }

    const [dataManageReducer, dispatchDataManage] = useReducer((state, action) => {
        return { ...state, ...action }
    }, initDataManageState)

    useEffect(() => {
        dispatchDataManage({ dataType: pathname })
    }, [pathname])

    useEffect(() => {
        if (dataType = 'groups') {
            readAllGroupsData((groups) => dispatchDataManage({
                dataType: 'groups',
                title: 'Groups data manager',
                tableColumns: ['Name', 'Role', 'Members', 'Action'],
                tableData: groups,
                onDeleteItem: 'some function',
                onAddItem: 'some function',
            }));
        } else if (dataType = 'categories') {
            readCategoriesData((categories) => dispatchDataManage({
                dataList: categories
            }));
        }
    }, [])

    return (
        <Stack>
            <Paper sx={{ p: 4 }}>

                <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                    Groups data manager
                </Typography>

                <GroupsList groupsData={groupsData} />

                <NewGroupForm />

            </Paper>
        </Stack>
    );
};

export default ManageGroupsData;
