import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { readAllTasksData, readAllUsersData, readUserData } from '../lib/api';

import TasksTable from './../components/TasksTable/TasksTable';
import TasksTableActions from './../components/TasksTable/TasksTableActions';

const UserTasks = () => {

    const token = useSelector(state => state.auth.token);
    const [userData, setUserData] = useState({ name: '', uid: token });
    const [filterItem, setFilterItem] = useState({ name: userData.name, value: userData.uid });
    const [allUsers, setAllUsers] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [sortingItem, setSortingItem] = useState('Priority');
    const [sortingOrder, setSortingOrder] = useState('Ascending');

    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current group', 'Modification date'];

    const allUsersSelectOptions = allUsers.map(user => ({ name: user.name, value: user.uid }));
    const tasksAssignedToUser = tasks.filter(task => task.currentUserId === filterItem.value && (task.status !== 'Canceled' && task.status !== 'Closed'));

    useEffect(() => {
        readAllTasksData(setTasks); //setError
        readAllUsersData(setAllUsers); //setError
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


    return (
        <>
            <TasksTableActions
                labels={labels}
                filterLabel='Assigned user'
                filterItem={filterItem}
                filterOptions={allUsersSelectOptions}
                filteredKey='currentUser'
                sortingItem={sortingItem}
                sortingOrder={sortingOrder}
                onFilterItemChange={filterItemChangeHandler}
                onSortingItemChange={sortingItemChangeHandler}
                onSortingOrderChange={sortingOrderChangeHandler}

            />

            <TasksTable
                tasks={tasksAssignedToUser}
                labels={labels}
                sortingOrder={sortingOrder}
                sortingItem={sortingItem}
                noTasksMessage={`There is no tasks assigned to user ${filterItem.name}`}
            />
        </>
    );
};

export default UserTasks;