import { ref, set, onValue, push, child } from 'firebase/database';
import { db } from '../util/firebase';

export function writeResponseData(taskId, responseData) {
    const newResponseRef = push(child(ref(db), '/responses/' + taskId));
    const newResponseKey = newResponseRef.key;

    set(newResponseRef, {
        id: newResponseKey,
        author: responseData.author,
        createDate: responseData.createDate,
        message: responseData.message,
        visibility: responseData.visibility
    }).catch(error => {
        console.log(error);
    })
};


/*export function writeTaskData(taskData) {
    const newTaskId = allTasks.length++;
    const newTaskRef = ref(db, '/tasks/' + newTaskId);

    set(newTaskRef, {
        id: newTaskId,
        createDate: taskData.createDate,
        modificationDate: taskData.modificationDate,
        priority: taskData.priority,
        category: taskData.category,
        title: taskData.title,
        description: taskData.description,
        author: taskData.author,
        status: taskData.status,
        currentUser: taskData.currentUser,
        currentGroup: taskData.currentGroup
    })
};*/


export function writeGroupData(groupName) {
    const newGroupId = groupName
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');

    const newGroupRef = ref(db, '/groups/' + newGroupId);

    set(newGroupRef, {
        name: groupName,
        // members property will be added when writeNewGroupMember will be called (?)
    })
};


export function writeNewGroupMember(groupName, userId) {
    const groupId = groupName
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');

    const newMemberRef = ref(db, '/groups/' + groupId + '/members');

    push(newMemberRef, userId);
};


export function writeCategoryData(category) {
    const newCategoryRef = ref(db, 'categories');
    push(newCategoryRef, category)
};

/*
export function readAllTasksData() {
    const tasksRef = ref(db, 'tasks');
    onValue(tasksRef, (snapshot) => {
        const tasksData = snapshot.val();
        updateTasks(tasksData);
    })
};


export function readSingleTaskData(taskId) {
    const taskRef = ref(db, '/tasks/' + taskId);
    onValue(taskRef, (snapshot) => {
        const taskData = snapshot.val();
        updateTask(taskData);
    })
};


export function readResponseData(taskId) {
    const responsesRef = ref(db, '/responses/' + taskId);
    onValue(responsesRef, (snapshot) => {
        const responsesData = snapshot.val();
        updateResponses(responsesData);
    })
};


export function readCategoriesData() {
    const categoriesRef = ref(db, 'categories');
    onValue(categoriesRef, (snapshot) => {
        const categoriesData = snapshot.val();
        updateCategories(categoriesData);
    })
};


export function readGroupsData() {
    const groupsRef = ref(db, 'groups');
    onValue(groupsRef, (snapshot) => {
        const groupsData = snapshot.val();
        updateGroups(groupsData);
    })
};


export function readSingleGroupData(groupName) {
    const groupId = groupName
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');

    const groupRef = ref(db, '/groups/' + groupId);
    onValue(groupRef, (snapshot) => {
        const groupData = snapshot.val();
        updateGroup(groupData);
    })
};*/