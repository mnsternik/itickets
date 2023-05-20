import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { readAllTasksData, readAllGroupsData, readAllUsersData } from '../lib/api';

import TasksTable from '../components/TasksTable/TasksTable';
import TasksTableActions from '../components/TasksTable/TasksTableActions';

const TasksViews = () => {

    const location = useLocation();
    const { pathname: viewType } = location;

    const userData = useSelector(state => state.auth.userData);

    const initActionsFilterState = {
        label: '',
        filteredProperty: '',
        defaultValue: '',
        options: []
    };

    const [actionsFilterState, dispatchActionsFilterState] = useReducer((state, action) => {
        const updatedState = { ...state, ...action }
        if (action.type === 'OPTIONS_GROUPS') {
            updatedState.options = action.options.map(group => ({
                name: group.name,
                value: group.name
            }))
        } else if (action.type === 'OPTIONS_USERS') {
            updatedState.options = action.options.map(user => ({
                name: user.name,
                value: user.uid
            }))
        }
        return updatedState
    }, initActionsFilterState);


    //columns nabems must correspond to camelized tasks properities names, like Current user -> currentUser
    const initTableState = {
        columns: [],
        tasks: [],
        noTasksMessage: ''
    };

    const [tableState, dispatchTableState] = useReducer((state, action) => {
        return { ...state, ...action }
    }, initTableState);

    useEffect(() => {
        readAllTasksData((tasks) => dispatchTableState({
            tasks: tasks
        }));
    }, [])

    useEffect(() => {
        if (viewType === '/group-tasks') {
            dispatchActionsFilterState({
                label: 'Assigned to group',
                filteredProperty: 'currentGroup',
                defaultValue: userData.group
            })
        } else if (viewType === '/user-tasks') {
            console.log('dispatched')
            dispatchActionsFilterState({
                label: 'Assigned to user',
                filteredProperty: 'currentUserId',
                defaultValue: userData.uid
            })
        } else if (viewType === '/user-created-tasks') {
            dispatchActionsFilterState({
                label: 'Created by user',
                filteredProperty: 'authorId',
                defaultValue: userData.uid
            })
        }
    }, [viewType, userData.uid, userData.group])

    useEffect(() => {
        if (viewType === '/group-tasks') {
            readAllGroupsData((groups) => dispatchActionsFilterState({
                type: 'OPTIONS_GROUPS',
                options: groups
            }));
        } else if (viewType === '/user-tasks' || viewType === '/user-created-tasks') {
            readAllUsersData((users) => dispatchActionsFilterState({
                type: 'OPTIONS_USERS',
                options: users
            }))
        }
    }, [viewType])

    //tasktable props to consider - search component also use it 
    return (
        <>
            <TasksTableActions
                filterData={actionsFilterState}
                tableData={tableState}
                updateTableData={dispatchTableState}
            />

            <button onClick={() => console.log(actionsFilterState)}>LOGGGG</button>

            <TasksTable
                tasks={tableState.tasks}
                labels={['ID', 'Title', 'Priority', 'Category', 'Status', 'Current user', 'Modification date']}
                error={false}
                noTasksMessage={'no takss!!!'}
            />
        </>

    );
};

export default TasksViews;