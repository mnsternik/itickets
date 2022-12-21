import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { readAllTasksData, readAllUsersData } from '../lib/api';

import TasksTable from './../components/TasksTable/TasksTable';
import TasksTableActions from './../components/TasksTable/TasksTableActions';

const UserTasks = () => {

    const userData = useSelector(state => state.auth.userData);
    const [allUsers, setAllUsers] = useState([]);
    const [filterItem, setFilterItem] = useState({ name: userData.name, value: userData.uid });

    const [tasks, setTasks] = useState([]);

    const [sortingItem, setSortingItem] = useState('Priority');
    const [sortingOrder, setSortingOrder] = useState('Ascending');

    const labels = ['Title', 'Priority', 'Modification date', 'Status', 'Current user', 'Current group'];

    // select input option expects a "value" property
    const allUsersSelectOptions = allUsers.map(user => ({ name: user.name, value: user.uid }));

    // changes sortingItem to camelCase property name
    const sortingKey = sortingItem
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');

    useEffect(() => {
        readAllTasksData(setTasks); //setError
        readAllUsersData(setAllUsers); //setError
    }, []);

    // filter open tasks assigned to logged user
    const filteredTasks = tasks.filter(task => task.currentUserId === filterItem.value && (task.status !== 'Canceled' && task.status !== 'Closed'));

    let sortedTasks = [];
    if (filteredTasks.length) {

        //sorting item is string
        if (typeof filteredTasks[0][sortingKey] === 'string') {
            sortedTasks = sortingOrder === 'Ascending' ?
                filteredTasks.sort((a, b) => a[sortingKey].localeCompare(b[sortingKey])) :
                filteredTasks.sort((a, b) => a[sortingKey].localeCompare(b[sortingKey])).reverse();
        }

        //sorting item is number
        else if (typeof filteredTasks[0][sortingKey] === 'number') {
            sortedTasks = sortingOrder === 'Ascending' ?
                filteredTasks.sort((a, b) => a[sortingKey] - b[sortingKey]) :
                filteredTasks.sort((a, b) => a[sortingKey] - b[sortingKey]).reverse();
        }

        //sorting item is date
        else if (sortingItem === 'Modification date' || sortingItem === 'Create date') {
            sortedTasks = sortingOrder === 'Ascending' ?
                filteredTasks.sort((a, b) => Date.parse(a[sortingKey]) - Date.parse(b[sortingKey])) :
                filteredTasks.sort((a, b) => Date.parse(a[sortingKey]) - Date.parse(b[sortingKey])).reverse();
        }
    }

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
                tasks={sortedTasks}
                labels={labels}
            />
        </>
    );
};

export default UserTasks;