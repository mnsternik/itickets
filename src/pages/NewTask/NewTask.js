import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import { useSelector } from 'react-redux';

import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewTask = () => {

    const [title, setTitle] = useState('');
    const [isTitleTouched, setIsTitleTouched] = useState(false);
    const [priority, setPriority] = useState('');
    const [isPriorityTouched, setIsPriorityTouched] = useState(false);
    const [description, setDescription] = useState('');
    const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [isCategoryTouched, setIsCategoryTouched] = useState(false);

    const { isLoading: sendTaskLoading, error: sendTaskError, sendRequest: sendTask } = useHttp();
    const { error: cateogiresFetchError, sendRequest: fetchCategories } = useHttp();

    const authState = useSelector(state => state.auth);

    const isEnteredTitleValid = title.trim() !== ''; //false
    const isEnteredDescriptionValid = description.trim() !== '';
    const isEnteredPriorityValid = priority.trim() !== '';
    const isEnteredCategoryValid = category.trim() !== '';

    const isTitleInvalid = !isEnteredTitleValid && isTitleTouched;
    const isDescriptionInvalid = !isEnteredDescriptionValid && isDescriptionTouched;
    const isPriorityInvalid = !isEnteredPriorityValid && isPriorityTouched;
    const isCategoryInvalid = !isEnteredCategoryValid && isCategoryTouched;


    useEffect(() => {
        const transformFetchedData = (data) => {
            const categories = [];
            for (let categoriesKey in data) {
                categories.push(data[categoriesKey]);
            }
            setFetchedCategories(categories);
        };

        fetchCategories({
            url: 'https://iticket-fd059-default-rtdb.firebaseio.com/applications.json',
        }, transformFetchedData)
    }, [fetchCategories]); //move fetching to redux component? 


    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const titleBlurHandler = (event) => {
        setIsTitleTouched(true);
    };


    const priorityChangeHandler = (event) => {
        setPriority(event.target.value);
    };

    const priorityBlurHandler = (event) => {
        setIsPriorityTouched(true);
    };


    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    const descriptionBlurHandler = (event) => {
        setIsDescriptionTouched(true);
    };


    const categoryChangeHandler = (event) => {
        setCategory(event.target.value);
    };

    const categoryBlurHandler = (event) => {
        setIsCategoryTouched(true);
    };

    const clearForm = () => {
        setTitle('');
        setIsTitleTouched(false);
        setDescription('');
        setIsDescriptionTouched(false);
        setCategory('');
        setIsCategoryTouched(false);
        setPriority('');
        setIsPriorityTouched(false);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        if (!isEnteredTitleValid || !isEnteredDescriptionValid || !isEnteredCategoryValid || !isEnteredPriorityValid) {
            setIsTitleTouched(true);
            setIsDescriptionTouched(true);
            setIsCategoryTouched(true);
            setIsPriorityTouched(true);
            return;
        };

        sendTask({
            url: 'https://iticket-fd059-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: {
                id: Math.random(), // <- id should be from response from firebase?
                author: authState.username,
                createDate: new Date(),
                modificationDate: new Date(),
                category: category,
                status: 'Open',
                priority: parseInt(priority),
                title: title,
                description: description,
                currentUser: 'None',
                currentGroup: authState.group,
                history: []
            }
        });
        clearForm();
    };


    let categories = 'No categories found';
    if (fetchedCategories) {
        categories = fetchedCategories.map(category => {
            return (
                <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
            )
        })
    };


    return (
        <Box
            component='form'
            sx={{
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
            }}>

            <Typography variant="h5" gutterBottom sx={{ textTransform: 'uppercase' }}>
                Create new task
            </Typography>

            <TextField
                id="title"
                label="Title"
                variant="outlined"
                size="small"
                value={title}
                error={isTitleInvalid}
                helperText={isTitleInvalid && 'Cannot be empty.'}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
            />

            <TextField
                id="description"
                label="Description"
                variant="outlined"
                size="small"
                value={description}
                multiline
                rows="5"
                error={isDescriptionInvalid}
                helperText={isDescriptionInvalid && 'Cannot be empty.'}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
            />

            <FormControl error={isPriorityInvalid}>
                <InputLabel size="small" id="priority-label">Priority</InputLabel>
                <Select
                    labelId="priority-label"
                    id="priority"
                    value={priority}
                    label="Priority"
                    size="small"
                    onChange={priorityChangeHandler}
                    onBlur={priorityBlurHandler}
                    sx={{ width: '120px' }}
                >
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                </Select>
                {isPriorityInvalid && <FormHelperText>Please choose priority.</FormHelperText>}
            </FormControl>

            <FormControl error={isCategoryInvalid}>
                <InputLabel size="small" id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Category"
                    size="small"
                    onChange={categoryChangeHandler}
                    onBlur={categoryBlurHandler}
                    sx={{ width: '120px' }}
                >
                    {categories}
                </Select>
                {isCategoryInvalid && <FormHelperText>Please choose category.</FormHelperText>}
            </FormControl>

            <Button
                variant="contained"
                size="large"
                onClick={submitHandler}
                sx={{ width: '120px' }}
            >
                Send
            </Button>
        </Box>
    )
};

export default NewTask; 