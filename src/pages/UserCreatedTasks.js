import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksData } from '../store/tasks';

import TasksTable from './../components/TasksTable/TasksTable';
import TasksTableActions from './../components/TasksTable/TasksTableActions';

const DUMMY_USERS = ['user1', 'user2', 'user3'];

const UserCreatedTasks = () => {

    const dispatch = useDispatch();

    const { tasks, error } = useSelector(state => state.tasks.tasksData);
    const user = useSelector(state => state.auth.username);

    const [filterItem, setFilterItem] = useState(user);
    const [sortingItem, setSortingItem] = useState('Priority');
    const [sortingOrder, setSortingOrder] = useState('Ascending');

    const labels = ['Title', 'Priority', 'Modification date', 'Status', 'Current user', 'Current group'];

    // changes sortingItem to camelCase property name
    const sortingKey = sortingItem
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');

    useEffect(() => {
        dispatch(fetchTasksData());
    }, [dispatch]);

    // open tasks assigned to user's group 
    const filteredTasks = tasks.filter(task => task.author === filterItem && (task.status !== 'Canceled' && task.status !== 'Closed'));

    let sortedTasks = [];
    if (filteredTasks.length) {

        if (typeof filteredTasks[0][sortingKey] === 'string') {
            sortedTasks = sortingOrder === 'Ascending' ?
                filteredTasks.sort((a, b) => a[sortingKey].localeCompare(b[sortingKey])) :
                filteredTasks.sort((a, b) => a[sortingKey].localeCompare(b[sortingKey])).reverse();
        }

        else if (typeof filteredTasks[0][sortingKey] === 'number') {
            sortedTasks = sortingOrder === 'Ascending' ?
                filteredTasks.sort((a, b) => a[sortingKey] - b[sortingKey]) :
                filteredTasks.sort((a, b) => a[sortingKey] - b[sortingKey]).reverse();
        }

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
                filterOptions={DUMMY_USERS}
                filteredKey='author'
                sortingItem={sortingItem}
                sortingOrder={sortingOrder}
                onFilterItemChange={filterItemChangeHandler}
                onSortingItemChange={sortingItemChangeHandler}
                onSortingOrderChange={sortingOrderChangeHandler}

            />
            <TasksTable
                tasks={sortedTasks}
                error={error}
                labels={labels}
            />
        </>

    );
};

export default UserCreatedTasks;
