import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { readAllTasksData, readAllUsersData, readUserData } from '../lib/api';

import TasksTable from './../components/TasksTable/TasksTable';
import TasksTableActions from './../components/TasksTable/TasksTableActions';

const UserCreatedTasks = () => {

    const token = useSelector(state => state.auth.token);

    const [userData, setUserData] = useState({ name: '', uid: token });
    const [filterItem, setFilterItem] = useState({ name: userData.name, value: userData.uid });
    const [allUsers, setAllUsers] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [sortingItem, setSortingItem] = useState('Priority');
    const [sortingOrder, setSortingOrder] = useState('Ascending');

    const statuses = useSelector(state => state.tasks.statuses);
    const [statusFilter, setStatusFilter] = useState({ name: 'Open', value: 'open' })

    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current user', 'Current group', 'Modification date'];

    const allUsersSelectOptions = allUsers.map(user => ({ name: user.name, value: user.uid }));
    const tasksCreatedByUser = tasks.filter(task => task.authorId === filterItem.value && task.status === statusFilter.name);

    useEffect(() => {
        readAllTasksData(setTasks);
        readAllUsersData(setAllUsers);
        readUserData(token, setUserData);
    }, [token]);

    useEffect(() => {
        setFilterItem({ name: userData.name, value: userData.uid });
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
                filterLabel='Author'
                filterItem={filterItem}
                filterOptions={allUsersSelectOptions}
                filteredKey='author'
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
                tasks={tasksCreatedByUser}
                labels={labels}
                sortingOrder={sortingOrder}
                sortingItem={sortingItem}
                noTasksMessage={`There is no tasks with status "${statusFilter.name}" created by user ${filterItem.name}`}
            />
        </>

    );
};

export default UserCreatedTasks;
