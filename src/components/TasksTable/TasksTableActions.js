import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { camelize, readAllGroupsData, readAllUsersData } from '../../lib/api';

import { Box } from '@mui/material';
import SelectInput from '../../UI/SelectInput';


const TasksTableActions = (props) => {

    const { viewType, tableData, updateTableData } = props;

    const loggedUserData = useSelector(state => state.auth.userData);
    const statusesOptions = useSelector(state => state.tasks.statuses);

    const initActionsFormState = {
        sortingItem: 'Priority',
        sortingOrder: 'Descending',
        status: 'In progress',
        viewFilterVal: '',
        viewFilterOptions: [],
        viewFilterLabel: '',
        viewFilteredProperty: ''
    };

    const [actionsFormState, dispatchActionsForm] = useReducer((state, action) => {
        return { ...state, ...action }
    }, initActionsFormState);

    // destructuring state for better useEffect readability
    const {
        sortingItem,
        sortingOrder,
        status,
        viewFilterVal: filterValue,
        viewfilteredProperty: filteredProp
    } = actionsFormState;

    // settings view filter attribtiues based on table's view type
    useEffect(() => {
        if (viewType === '/group-tasks') {
            readAllGroupsData((groups) => dispatchActionsForm({
                viewFilterVal: loggedUserData.group,
                viewFilterOptions: groups.map(group => ({ name: group.name, value: group.name })),
                viewFilterLabel: 'Assigned to group',
                viewfilteredProperty: 'currentGroup'
            }))
        } else if (viewType === '/user-created-tasks') {
            readAllUsersData((users) => dispatchActionsForm({
                viewFilterVal: loggedUserData.uid,
                viewFilterOptions: users.map(user => ({ name: user.name, value: user.uid })),
                viewFilterLabel: 'Created by user',
                viewfilteredProperty: 'authorId'
            }))
        } else {
            readAllUsersData((users) => dispatchActionsForm({
                viewFilterVal: loggedUserData.uid,
                viewFilterOptions: users.map(user => ({ name: user.name, value: user.uid })),
                viewFilterLabel: 'Assigned to user',
                viewfilteredProperty: 'currentUserId'
            }))
        }
    }, [loggedUserData.group, loggedUserData.uid, viewType])

    // filtering data depending on view filter and status, and then dispatching new tasks list to parent component (and selected status)
    useEffect(() => {
        let transformedTasks = [...tableData.tasks];
        if (filterValue && status && transformedTasks.length) {
            transformedTasks = filterTasks(transformedTasks, filterValue, filteredProp, status);
        }
        if (sortingOrder && sortingItem && transformedTasks.length) {
            transformedTasks = sortTasks(transformedTasks, sortingOrder, sortingItem);
        }
        updateTableData({
            displayedTasks: transformedTasks,
            selectedStatus: status
        })
    }, [
        sortingItem,
        sortingOrder,
        status,
        filterValue,
        filteredProp,
        tableData.tasks,
        updateTableData,
    ])

    function sortTasks(tasks, sortingOrder, sortingItem) {
        const sortedTasks = [...tasks];
        const sortingKey = camelize(sortingItem);
        const sortingKeyDataType = typeof tasks[0][sortingKey];

        if (sortingKeyDataType === 'string') {
            sortedTasks.sort((taskA, taskB) => taskA[sortingKey].localeCompare(taskB[sortingKey]));
        } else if (sortingKeyDataType === 'number') {
            sortedTasks.sort((taskA, taskB) => taskA[sortingKey] - taskB[sortingKey])
        } else if (sortingItem === 'Modification date' || sortingItem === 'Create date') {
            sortedTasks.sort((taskA, taskB) => Date.parse(taskA[sortingKey]) - Date.parse(taskB[sortingKey]))
        }
        return sortingOrder === 'Ascending' ?
            sortedTasks : sortedTasks.reverse()
    };

    function filterTasks(tasks, viewFilter, filteredProperty, status) {
        return tasks
            .filter(task => task[filteredProperty] === viewFilter)
            .filter(task => task.status === status);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: 2,
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <SelectInput
                    label='Sort by'
                    options={['Priority', 'Create date', 'Modification date', 'Author', 'Category']}
                    value={actionsFormState.sortingItem}
                    onChange={(e) => dispatchActionsForm({ sortingItem: e.target.value })}
                    sx={{ mr: 1 }}
                />

                <SelectInput
                    label='Order'
                    options={['Ascending', 'Descending']}
                    value={actionsFormState.sortingOrder}
                    onChange={(e) => dispatchActionsForm({ sortingOrder: e.target.value })}
                />
            </Box>

            <Box>
                <SelectInput
                    label='Status'
                    options={statusesOptions}
                    value={actionsFormState.status}
                    onChange={(e) => dispatchActionsForm({ status: e.target.value })}
                    sx={{ mr: 1 }}
                />

                <SelectInput
                    structure='objects'
                    label={actionsFormState.viewFilterLabel}
                    options={actionsFormState.viewFilterOptions}
                    value={actionsFormState.viewFilterVal}
                    onChange={(e) => dispatchActionsForm({ viewFilterVal: e.target.value })}
                />
            </Box>
        </Box>
    )
};

export default TasksTableActions;