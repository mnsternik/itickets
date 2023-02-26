import { useReducer } from "react";

import SelectInput from "../../UI/SelectInput";

import { TextField, Stack, Button } from "@mui/material";

const initSearchOptions = {
    assignedToGroup: '',
    assignedToUser: '',
    author: '',
    category: '',
    priority: '',
    status: '',
    title: '',
    description: '',
};

const SearchOptionsForm = (props) => {

    const groupsSelectOptions = props.groups.map(group => ({ name: group.name, value: group.id }));
    const usersSelectOptions = props.users.map(user => ({ name: user.name, value: user.uid }));
    const categoriesSelectOptions = props.categories.map(category => ({ name: category.name, value: category.id }));
    const prioritesSelectOptions = props.priorites;
    const statusesSelectOptions = props.statuses;

    const [searchOptionsState, dispatchSearchOptions] = useReducer((prev, next) => {

        return { ...prev, ...next }
    }, initSearchOptions)

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(searchOptionsState);

    };

    return (
        <Stack
            component={'form'}
            onSubmit={submitHandler}
            spacing={2}
            sx={{ width: '80%' }}
        >

            <Stack direction='row' spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <SelectInput
                    label='Assigned to group'
                    options={groupsSelectOptions}
                    structure='objects'
                    sx={{ minWidth: 180 }}
                    onChange={e => dispatchSearchOptions({ assignedToGroup: e.target.value })}
                />

                <SelectInput
                    label='Assigned to user'
                    options={usersSelectOptions}
                    structure='objects'
                    sx={{ minWidth: 180 }}
                    onChange={e => dispatchSearchOptions({ assignedToUser: e.target.value })}
                />

                <SelectInput
                    label='Author'
                    options={usersSelectOptions}
                    structure='objects'
                    sx={{ minWidth: 180 }}
                    onChange={e => dispatchSearchOptions({ author: e.target.value })}
                />
            </Stack>

            <Stack direction='row' spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <SelectInput
                    label='Category'
                    options={categoriesSelectOptions}
                    structure='objects'
                    onChange={e => dispatchSearchOptions({ category: e.target.value })}
                />

                <SelectInput
                    label='Priority'
                    options={prioritesSelectOptions}
                    structure='objects'
                    onChange={e => dispatchSearchOptions({ priority: e.target.value })}
                />

                <SelectInput
                    label='Statuses'
                    options={statusesSelectOptions}
                    structure='objects'
                    onChange={e => dispatchSearchOptions({ status: e.target.value })}
                />

                <TextField
                    label='Title keywords'
                    onChange={e => dispatchSearchOptions({ title: e.target.value })}
                />

                <TextField
                    label='Description keywords'
                    onChange={e => dispatchSearchOptions({ description: e.target.value })}
                />
            </Stack>

            <Button
                type='submit'
                size='large'
                variant='contained'
                sx={{ width: 140, }}
            >
                Search
            </Button>

        </Stack>
    )
};

export default SearchOptionsForm; 