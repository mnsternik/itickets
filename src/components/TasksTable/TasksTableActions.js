import { useReducer, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { camelize } from '../../lib/api';

import Box from '@mui/material/Box';
import SelectInput from '../../UI/SelectInput';

const TasksTableActions = (props) => {

    const statusOptions = useSelector(state => state.tasks.statuses);
    //const filterDefaultValue = useSelector(state => state.auth.userData.uid);

    const { updateTableData } = props;
    const { tasks } = props.tableData;
    const {
        filteredProperty,
        defaultValue: defaultFilterValue,
        options: viewFilterOptions
    } = props.filterData;

    const initActionsState = {
        sortingItem: 'Priority',
        sortingOrder: 'Ascending',
        statusFilter: 'Open',
        viewFilterValue: defaultFilterValue,
    };

    const [actionsState, dispatchActionsState] = useReducer((state, action) => {
        const updatedState = { ...state, ...action }
        if (action.type === 'SORTING_ORDER') {
            updatedState.sortingOrder = state.sortingOrder === 'Ascending' ? 'Descending' : 'Ascending';
        }
        console.log(updatedState);
        return updatedState;
    }, initActionsState);


    const sortTasks = useCallback((tasks, sortingOrder, sortingItem) => {
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
    }, []);

    const filterTasksByViewProp = useCallback((tasks, filterValue, filteredPropertyName) => {
        const filteredTasks = [...tasks];
        return filteredTasks.filter(task => task[filteredPropertyName] === filterValue);
    }, [])

    const filterTasksByStatus = useCallback((tasks, status) => {
        const filteredTasks = [...tasks];
        return filteredTasks.filter(task => task.status === status);
    }, []);

    useEffect(() => {
        dispatchActionsState({
            viewFilterValue: defaultFilterValue,
            viewFilterOptions: viewFilterOptions
        })
    }, [defaultFilterValue, viewFilterOptions])

    useEffect(() => {
        if (tasks.length) {
            const tasksFilteredByStatus = filterTasksByStatus(tasks, actionsState.status);
            const tasksFilteredByView = filterTasksByViewProp(tasksFilteredByStatus, actionsState.viewFilter, filteredProperty);
            const sortedTasks = sortTasks(tasksFilteredByView, actionsState.sortingOrder, actionsState.sortingItem)
            updateTableData({ tasks: sortedTasks })
        }
    }, [])


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
                    value={actionsState.sortingItem}
                    onChange={(e) => dispatchActionsState({ sortingItem: e.target.value })}
                    sx={{ mr: 1 }}
                />

                <SelectInput
                    label='Order'
                    options={['Ascending', 'Descending']}
                    value={actionsState.sortingOrder}
                    onChange={(e) => dispatchActionsState({ sortingOrder: e.target.value })}
                />
            </Box>

            <Box>
                <SelectInput
                    label='Status'
                    options={statusOptions}
                    value={actionsState.statusFilter}
                    onChange={(e) => dispatchActionsState({ statusFilter: e.target.value })}
                    sx={{ mr: 1 }}

                />
                <button onClick={() => console.log(actionsState)}>CLICK</button>
                {
                    //props is used here!!
                }
                {<SelectInput
                    structure='objects'
                    label={props.filterData.label}
                    options={viewFilterOptions}
                    value={actionsState.viewFilterValue}
                    onChange={(e) => dispatchActionsState({ viewFilter: e.target.value })}
                />}
            </Box>

        </Box>
    )
};

export default TasksTableActions;
