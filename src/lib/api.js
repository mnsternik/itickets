import { ref, set, onValue, push, child } from 'firebase/database';
import { db } from '../util/firebase';

//add check if data exists (for example 2 groups with same name? 

export function writeNewResponseData(taskId, responseData) {
    const newResponseRef = push(child(ref(db), '/responses/' + taskId));
    const newResponseKey = newResponseRef.key;

    set(newResponseRef, { ...responseData, id: newResponseKey })
};


export function writeNewTaskData(taskData) {
    const newTaskRef = ref(db, '/tasks/' + taskData.id);
    set(newTaskRef, taskData);
};

/*export function writeNewTaskId() {
    const newTaskIdRef = ref(db, 'id');
}*/



export function writeNewGroupData(groupData) {
    const newGroupRef = ref(db, '/groups/' + groupData.id);
    set(newGroupRef, groupData);
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
    const newCategoryRef = ref(db, '/categories/' + category.id);
    set(newCategoryRef, category)
};


export function updateSingleTaskData(taskData) {
    const newTaskRef = ref(db, '/tasks/' + taskData.id);
    set(newTaskRef, taskData)
};


export function readAllTasksData(updateTasks) {
    const tasksRef = ref(db, 'tasks');
    return onValue(tasksRef, (snapshot) => {
        const fetchedTasks = snapshot.val();
        const transformedTasks = [];

        for (const taskKey in fetchedTasks) {
            transformedTasks.push(fetchedTasks[taskKey])
        }

        updateTasks(transformedTasks);
    });
};


export function readSingleTaskData(taskId, updateTask) {
    const taskRef = ref(db, '/tasks/' + taskId);
    onValue(taskRef, (snapshot) => {
        const taskData = snapshot.val();
        updateTask(taskData);
    });
};


export function readResponseData(taskId, updateResponses) {
    const responsesRef = ref(db, '/responses/' + taskId);
    return onValue(responsesRef, (snapshot) => {
        const fetchedResponses = snapshot.val()
        const transformedResponses = [];

        for (const resKey in fetchedResponses) {
            transformedResponses.push(fetchedResponses[resKey])
        }

        updateResponses(transformedResponses);
    })
};


export function readCategoriesData(updateCategories) {
    const categoriesRef = ref(db, 'categories');
    onValue(categoriesRef, (snapshot) => {
        const categories = snapshot.val();
        const transformedCategories = [];

        for (let categoryKey in categories) {
            transformedCategories.push(categories[categoryKey]);
        }

        updateCategories(transformedCategories);
    });
};



export function readGroupsData(updateGroups) {
    const groupsRef = ref(db, 'groups');
    onValue(groupsRef, (snapshot) => {
        const groups = snapshot.val();
        const transformedGroups = [];

        for (let groupKey in groups) {
            transformedGroups.push(groups[groupKey]);
        }

        updateGroups(transformedGroups);
    });
};


export function readSingleGroupData(groupName) {
    const groupId = groupName
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');

    const groupRef = ref(db, '/groups/' + groupId);
    onValue(groupRef, (snapshot) => {
        return snapshot.val();
    });
};


export function readNewTaskId(setNewTaskId) {
    const tasksRef = ref(db, 'tasks');
    return onValue(tasksRef, (snapshot) => {
        if (!snapshot.val()) {
            setNewTaskId('T1');
            return;
        }

        const newTaskId = Object.keys(snapshot.val()).length + 1;
        setNewTaskId('T' + newTaskId);
    });
};


export function deleteResponse(taskId, responseKey) {
    const responseRef = ref(db, '/responses/' + taskId + '/' + responseKey);
    set(responseRef, null)
};


export function deleteGroup(groupId) {
    const groupRef = ref(db, '/groups/' + groupId);
    set(groupRef, null)
};

export function deleteCategory(categoryId) {
    const categoriesRef = ref(db, '/categories/' + categoryId);
    set(categoriesRef, null)
};

