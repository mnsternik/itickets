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

    const allGroupsSelectOptions = allGroups.map(group => ({ name: group.name, value: group.name }));
    const userGroupTasks = tasks.filter(task => task.currentGroup === filterItem.value && (task.status !== 'Canceled' && task.status !== 'Closed'));

    //labels must correspond to tasks properities names, like Current user -> currentUser
    const labels = ['Title', 'Priority', 'Modification date', 'Status', 'Current user', 'Current group'];

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


    return (
        <>
            <TasksTableActions
                labels={labels}
                filterItem={filterItem}
                filterOptions={allGroupsSelectOptions}
                filteredKey='currentGroup'
                sortingItem={sortingItem}
                sortingOrder={sortingOrder}
                onFilterItemChange={filterItemChangeHandler}
                onSortingItemChange={sortingItemChangeHandler}
                onSortingOrderChange={sortingOrderChangeHandler}

            />

            <TasksTable
                tasks={userGroupTasks}
                labels={labels}
                sortingOrder={sortingOrder}
                sortingItem={sortingItem}
                noTasksMessage={`There is no tasks assigned to group ${filterItem.name}`}
            />

        </>

    );
};

export default GroupTasks;