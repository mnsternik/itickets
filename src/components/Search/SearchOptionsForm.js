import { useReducer } from "react";

import SelectInput from "../../UI/SelectInput";

import { Paper, TextField } from "@mui/material";

const SearchOptionsForm = (props) => {

    const groupsSelectOptions = props.groups.map(group => ({ name: group.name, id: group.id }));
    const usersSelectOptions = props.users.map(user => ({ name: user.name, id: user.uid }));
    const categoriesSelectOptions = props.categories.map(category => ({ name: category.name, id: category.id }));
    const prioritesSelectOptions = props.priorites;

    const initSearchFormState = {
        assignedToGroup: '',
        assignedToUser: '',
        createdByGroup: '',
        createdByUser: '',
        category: '',
        priority: '',
        title: '',
        description: ''
    };

    const searchReducer = ((state, action) => {
        if (action.type === 'assigned_group_change') {
            return { ...state, assignedToGroup: action.payload }
        }
        if (action.type === 'assigned_user_change') {
            return { ...state, assignedToUser: action.payload }
        }
        if (action.type === 'created_group_change') {
            return { ...state, createdByGroup: action.payload }
        }
        if (action.type === 'created_user_change') {
            return { ...state, createdByUser: action.payload }
        }
        if (action.type === 'category_change') {
            return { ...state, category: action.payload }
        }
        if (action.type === 'priority_change') {
            return { ...state, priority: action.payload }
        }
        if (action.type === 'title_change') {
            return { ...state, title: action.payload }
        }
        if (action.type === 'description_change') {
            return { ...state, description: action.payload }
        }
        return initSearchFormState;
    });

    const [searchState, dispatchSearch] = useReducer(searchReducer, initSearchFormState);


    return (
        <Paper component={'form'}>

            <SelectInput
                label='Assigned to group'
                options={groupsSelectOptions}
                structure='objects'

            />

            <SelectInput
                label='Assigned to user'
                options={usersSelectOptions}
                structure='objects'

            />

            <SelectInput
                label='Created by group'
                options={groupsSelectOptions}
                structure='objects'

            />

            <SelectInput
                label='Assigned by user'
                options={usersSelectOptions}
                structure='objects'

            />

            <SelectInput
                label='Category'
                options={categoriesSelectOptions}
                structure='objects'

            />

            <SelectInput
                label='Priority'
                options={prioritesSelectOptions}
                structure='objects'

            />

            <TextField
                label='Title'

            />

            <TextField
                label='Description'

            />

        </Paper>
    )
};

export default SearchOptionsForm; 