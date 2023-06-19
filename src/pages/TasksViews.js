import { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { readAllTasksData } from '../lib/api';

import TasksTable from '../components/TasksTable/TasksTable';
import TasksTableActions from '../components/TasksTable/TasksTableActions';

const TasksViews = () => {

    const location = useLocation();
    const { pathname } = location;

    const [viewType, setViewType] = useState('');

    //columns names must correspond to camelized tasks properities names, like Current user -> currentUser
    const initTableState = {
        tasks: [],
        displayedTasks: [],
        selectedStatus: '',
        columns: [],
        noTasksMessage: ''
    };

    const [tableState, dispatchTableState] = useReducer((state, action) => {
        return { ...state, ...action }
    }, initTableState);

    useEffect(() => {
        setViewType(pathname);
    }, [pathname])

    useEffect(() => {
        readAllTasksData((tasks) => dispatchTableState({
            tasks: tasks
        }));
    }, [])

    useEffect(() => {
        if (viewType === '/group-tasks') {
            dispatchTableState({
                columns: ['ID', 'Title', 'Author', 'Priority', 'Category', 'Status', 'Current user', 'Modification date'],
                noTasksMessage: `There is no tasks with status "${tableState.selectedStatus}" assigned to selected group`
            })
        } else if (viewType === '/user-tasks') {
            dispatchTableState({
                columns: ['ID', 'Title', 'Author', 'Priority', 'Category', 'Status', 'Current group', 'Modification date'],
                noTasksMessage: `There is no tasks with status "${tableState.selectedStatus}" assigned to selected user`
            })
        } else if (viewType === '/user-created-tasks') {
            dispatchTableState({
                columns: ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current group', 'Current user', 'Modification date'],
                noTasksMessage: `There is no tasks with status "${tableState.selectedStatus}" created by selected user`
            })
        };
    }, [tableState.selectedStatus, viewType])

    return (
        <>
            <TasksTableActions
                viewType={viewType}
                tableData={tableState}
                updateTableData={dispatchTableState}
            />

            <TasksTable
                tasks={tableState.displayedTasks}
                labels={tableState.columns}
                noTasksMessage={tableState.noTasksMessage}
                error={false}
            />
        </>
    );
};

export default TasksViews;