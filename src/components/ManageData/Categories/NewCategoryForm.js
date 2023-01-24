import { useState } from 'react';
import { writeCategoryData, camelize } from '../../../lib/api';

import { Box, TextField, Button, Alert, Stack } from '@mui/material';


const NewCategoryForm = () => {

    const [categoryName, setCategoryName] = useState('');
    const isAddButtonDisabled = categoryName.trim('') === '';

    const [error, setError] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = error ? error : 'New category created';


    const categoryNameChangeHandler = (event) => {
        setCategoryName(event.target.value)
    };

    const closeAlertHandler = () => {
        setShowAlert(false);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);

        const newCategory = {
            id: camelize(categoryName),
            name: categoryName,
        };

        writeCategoryData(newCategory, setError, setCategoryName);
        setShowAlert(true);
    };

    return (
        <Stack direction='column' spacing={2}>

            <Box component='form' onSubmit={submitHandler} sx={{ display: 'flex' }}>

                <TextField
                    label={'New category name'}
                    variant='outlined'
                    value={categoryName}
                    onChange={categoryNameChangeHandler}
                    sx={{ width: 320, my: 1, mr: 3 }}
                />

                <Button
                    variant='contained'
                    type='submit'
                    size='large'
                    disabled={isAddButtonDisabled}
                    sx={{ my: 'auto' }}
                >
                    Add
                </Button>

            </Box>

            {showAlert && <Alert severity={error ? 'error' : 'success'} onClose={closeAlertHandler}>
                {alertMessage}
            </Alert>}

        </Stack>
    )
};

export default NewCategoryForm;

