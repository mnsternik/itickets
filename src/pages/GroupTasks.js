import { useEffect, useState } from 'react';
import { useSelector, } from 'react-redux';
import { readAllTasksData, readAllGroupsData, readUserData } from '../lib/api';

import TasksTable from './../components/TasksTable/TasksTable';
import TasksTableActions from './../components/TasksTable/TasksTableActions';

const GroupTasks = () => {

    const token = useSelector(state => state.auth.token);

    const [userData, setUserData] = useState({ name: '', group: '' });
    const [filterItem, setFilterItem] = useState({ name: userData.group, value: userData.group });
    const [allGroups, setAllGroups] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [sortingItem, setSortingItem] = useState('Priority');
    const [sortingOrder, setSortingOrder] = useState('Ascending');

    const statuses = useSelector(state => state.tasks.statuses);
    const [statusFilter, setStatusFilter] = useState({ name: 'Open', value: 'open' })

    const allGroupsSelectOptions = allGroups.map(group => ({ name: group.name, value: group.name }));

    const userGroupTasks = tasks.filter(task => task.currentGroup === filterItem.value && task.status === statusFilter.name)

    //labels must correspond to tasks properities names, like Current user -> currentUser
    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current user', 'Modification date'];

    useEffect(() => {
        readAllTasksData(setTasks);
        readAllGroupsData(setAllGroups);
        readUserData(token, setUserData);
    }, [token])

    useEffect(() => {
        setFilterItem({ name: userData.group, value: userData.group });
    }, [userData])


    const filterItemChangeHandler = (updatedFilterItem) => {
        setFilterItem(updatedFilterItem);
    };

    const sortingItemChangeHandler = (updatedSortingItem) => {
        setSortingItem(updatedSortingItem);
    };

    const sortingOrderChangeHandler = (updatedSortingOrder) => {
        setSortingOrder(updatedSortingOrder);
    };

    const statusFilterChangeHandler = (updatedStatus) => {
        setStatusFilter(updatedStatus);
    };


    return (
        <>
            <TasksTableActions
                labels={labels}
                filterLabel='Group'
                filterItem={filterItem}
                filterOptions={allGroupsSelectOptions}
                filteredKey='currentGroup'
                sortingItem={sortingItem}
                sortingOrder={sortingOrder}
                statuses={statuses}
                statusFilter={statusFilter}
                onFilterItemChange={filterItemChangeHandler}
                onSortingItemChange={sortingItemChangeHandler}
                onSortingOrderChange={sortingOrderChangeHandler}
                onStatusFilterChange={statusFilterChangeHandler}
            />

            <TasksTable
                tasks={userGroupTasks}
                labels={labels}
                sortingOrder={sortingOrder}
                sortingItem={sortingItem}
                noTasksMessage={`There is no tasks with status "${statusFilter.name}" assigned to group ${filterItem.name}`}
            />

        </>

    );
};

export default GroupTasks;