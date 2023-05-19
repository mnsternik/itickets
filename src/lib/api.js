import { ref, set, get, onValue, push, child } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { db, auth } from '../util/firebase';


//for changing categories and groups names to their ids (also used in other parts of code)
export function camelize(str) {
    return str
        .split(' ')
        .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
        .join('');
};


// ------------  AUTH --------------


export function writeNewUserData(userData, password, setError, clearForm) {
    createUserWithEmailAndPassword(auth, userData.email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            const newUserRef = ref(db, '/users/' + uid);
            const updatedUserData = { ...userData, uid: uid };
            set(newUserRef, updatedUserData);
            writeNewGroupMember(userData.group, uid);
        })
        .then(() => {
            clearForm();
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                setError('E-mail already in use')
            }
            else if (error.code === 'auth/weak-password') {
                setError('Password must be at least 6 characters long')
            }
            else if (error.code === 'auth/invalid-email') {
                setError('Inavlid e-mail address')
            }
            else {
                setError('Authentication error. Try again later. ');
            }
            return error;
        })
};


export function signUserIn(email, password, setError) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem('iticketsUid', userCredential.user.uid);
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email') {
                setError('Invalid e-mail address')
            }
            else if (error.code === 'auth/user-not-found') {
                setError('User not found')
            }
            else if (error.code === 'auth/wrong-password') {
                setError('Wrong password')
            }
            else {
                setError("Authentication error");
            }
        });
};


export function updateUserPassword(newPassword, setError, setShowAlert) {
    const user = auth.currentUser;
    updatePassword(user, newPassword).then(() => {
        setShowAlert(true);
    }).catch((error) => {
        setError(error);
        setShowAlert(true);
    });
};


export function signUserOut() {
    localStorage.removeItem('iticketsUid');
    signOut(auth)
};



// ------------  USERS DATA --------------


export function readUserData(uid, updateUser) {
    const userRef = ref(db, '/users/' + uid);
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        updateUser(userData);
    });
};


export function readAllUsersData(updateUsers) {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        const transformedUsers = [];
        for (const userKey in usersData) {
            transformedUsers.push(usersData[userKey])
        }
        updateUsers(transformedUsers);
    });
};


export function updateUserData(userData) {
    const userRef = ref(db, '/users/' + userData.uid);
    set(userRef, userData)
};



// ------------  TASKS DATA --------------


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


export function writeNewTaskData(taskData) {
    const newTaskRef = ref(db, '/tasks/' + taskData.id);
    writeNewCategoryMember(taskData.category, taskData.id);
    set(newTaskRef, taskData);
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



// ------------  RESPONSES DATA -------------- 


export function writeNewResponseData(taskId, responseData) {
    const newResponseRef = push(child(ref(db), '/responses/' + taskId));
    const newResponseKey = newResponseRef.key;
    set(newResponseRef, { ...responseData, id: newResponseKey })
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


export function deleteResponse(taskId, responseKey) {
    const responseRef = ref(db, '/responses/' + taskId + '/' + responseKey);
    set(responseRef, null)
};



// ------------  GROUPS DATA -------------- 


export function writeNewGroupData(groupData, setError, clearForm) {
    const newGroupRef = ref(db, '/groups/' + groupData.id);
    get(newGroupRef).then(snapshot => {
        if (snapshot.exists()) {
            throw new Error(`Group ${groupData.name} already exists`);
        } else {
            set(newGroupRef, groupData)
            clearForm('')
        }
    }).catch(err => {
        setError(err.message)
    })
};


export function readAllGroupsData(updateGroups) {
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
    const groupId = camelize(groupName);
    const groupRef = ref(db, '/groups/' + groupId);
    onValue(groupRef, (snapshot) => {
        return snapshot.val();
    });
};


export function deleteGroup(groupId) {
    const groupRef = ref(db, '/groups/' + groupId);
    set(groupRef, null)
};


export function writeNewGroupMember(groupName, userId) {
    const groupId = camelize(groupName);
    const newMemberRef = ref(db, '/groups/' + groupId + '/members');
    push(newMemberRef, userId);
};


export function readGroupMembers(groupName, setMembers) {
    const groupId = camelize(groupName)
    const groupRef = ref(db, '/groups/' + groupId);
    onValue(groupRef, (snapshot) => {
        const members = snapshot.val();
        const transformedMembers = [];
        for (const taskKey in members) {
            transformedMembers.push(members[taskKey])
        }
        setMembers(transformedMembers);
    });
};



// ------------  CATEGORIES DATA -------------- 


export function writeCategoryData(category, setError, clearForm) {
    const newCategoryRef = ref(db, '/categories/' + category.id);
    get(newCategoryRef).then(snapshot => {
        if (snapshot.exists()) {
            throw new Error(`Category ${category.name} already exists`)
        } else {
            set(newCategoryRef, category)
            clearForm('')
        }
    }).catch(err => {
        setError(err.message)
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


export function deleteCategory(categoryId) {
    const categoriesRef = ref(db, '/categories/' + categoryId);
    set(categoriesRef, null)
};


export function writeNewCategoryMember(categoryName, taskId) {
    const categoryId = camelize(categoryName)
    const newMemberRef = ref(db, '/categories/' + categoryId + '/members');
    push(newMemberRef, taskId);
};


export function readCategoryMembers(categoryName, setMembers) {
    const categoryId = camelize(categoryName)
    const categoryRef = ref(db, '/categories/' + categoryId);
    onValue(categoryRef, (snapshot) => {
        const members = snapshot.val();
        const transformedMembers = [];
        for (const categoryKey in members) {
            transformedMembers.push(members[categoryKey])
        }
        setMembers(transformedMembers);
    });
};


