import { useReducer, useState } from "react";
import { useSelector } from "react-redux";

import SelectInput from "../../UI/SelectInput";

import { TextField, Stack, Button, FormControl, FormLabel, FormControlLabel, Switch } from "@mui/material";

const initSearchOptions = {
    currentUserId: '',
    currentGroup: '',
    authorId: '',
    category: '',
    priority: '',
    status: '',
    title: '',
    description: '',
};

const SearchOptionsForm = (props) => {

    const prioritiesSelectOptions = useSelector(state => state.tasks.priorities);
    const statusesSelectOptions = useSelector(state => state.tasks.statuses).map(status => status.name);;

    const groupsSelectOptions = props.groups.map(group => group.name);
    const usersSelectOptions = props.users.map(user => ({ name: user.name, value: user.uid }));
    const categoriesSelectOptions = props.categories.map(category => category.name);

    const [isSearchingArchive, setIsSearchingArchive] = useState(false);

    const [searchOptionsState, dispatchSearchOptions] = useReducer((state, action) => {
        return { ...state, ...action }
    }, initSearchOptions)

    const fieldsetChangeHandler = () => {
        setIsSearchingArchive(isSearching => !isSearching);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        props.onSearchSubmit(searchOptionsState, isSearchingArchive);
    };

    return (
        <Stack
            component={'form'}
            onSubmit={submitHandler}
            spacing={1}
            sx={{ width: '80%' }}
        >

            <Stack direction='row' spacing={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <SelectInput
                    label='Category'
                    options={categoriesSelectOptions}
                    value={searchOptionsState.category}
                    onChange={e => dispatchSearchOptions({ category: e.target.value })}
                />

                <SelectInput
                    label='Priority'
                    structure='objects'
                    options={prioritiesSelectOptions}
                    value={searchOptionsState.priority}
                    onChange={e => dispatchSearchOptions({ priority: e.target.value })}
                />

                <SelectInput
                    label='Status'
                    options={statusesSelectOptions}
                    value={searchOptionsState.status}
                    onChange={e => dispatchSearchOptions({ status: e.target.value })}
                />
            </Stack>

            <Stack direction='row' spacing={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <SelectInput
                    label='Assigned to group'
                    options={groupsSelectOptions}
                    value={searchOptionsState.currentGroup}
                    sx={{ minWidth: 180 }}
                    onChange={e => dispatchSearchOptions({ currentGroup: e.target.value })}
                />

                <SelectInput
                    label='Assigned to user'
                    structure='objects'
                    options={usersSelectOptions}
                    value={searchOptionsState.currentUserId}
                    sx={{ minWidth: 180 }}
                    onChange={e => dispatchSearchOptions({ currentUserId: e.target.value })}
                />

                <SelectInput
                    label='Author'
                    structure='objects'
                    options={usersSelectOptions}
                    value={searchOptionsState.authorId}
                    sx={{ minWidth: 180 }}
                    onChange={e => dispatchSearchOptions({ authorId: e.target.value })}
                />
            </Stack>

            <Stack direction='row' spacing={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label='Title keywords'
                    value={searchOptionsState.title}
                    sx={{ minWidth: 350 }}
                    onChange={e => dispatchSearchOptions({ title: e.target.value })}
                />

                <TextField
                    label='Description keywords'
                    value={searchOptionsState.description}
                    sx={{ minWidth: 350 }}
                    onChange={e => dispatchSearchOptions({ description: e.target.value })}
                />
            </Stack>

            <Stack direction='row' spacing={2}>
                <Button
                    type='submit'
                    size='large'
                    variant='contained'
                    sx={{ width: 140 }}
                >
                    Search
                </Button>

                <Button
                    size='large'
                    variant='outlined'
                    sx={{ width: 140 }}
                    onClick={() => dispatchSearchOptions(initSearchOptions)}
                >
                    Clear
                </Button>

                <FormControl
                    component="fieldset"
                    variant="standard"
                >
                    <FormLabel component="legend">
                        {isSearchingArchive ? 'Archive' : 'Main'}
                    </FormLabel>
                    <FormControlLabel
                        label="Searched database"
                        control={
                            <Switch checked={isSearchingArchive} onChange={fieldsetChangeHandler} name="archive" />
                        }
                    />
                </FormControl>
            </Stack>

        </Stack>
    )
};

export default SearchOptionsForm; 