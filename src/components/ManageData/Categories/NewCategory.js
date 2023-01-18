import { useState } from 'react';
import { writeCategoryData } from "../../../lib/api";

import { Box, TextField, Button } from "@mui/material"


const NewCategory = () => {

    const [categoryName, setCategoryName] = useState('');
    const isAddButtonDisabled = categoryName.trim('') === '';

    const categoryNameChangeHandler = (event) => {
        setCategoryName(event.target.value)
    };

    const addNewCategoryHandler = () => {
        const newCategoryId = categoryName
            .split(' ')
            .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
            .join('');

        const newCategory = {
            id: newCategoryId,
            name: categoryName,
        };

        writeCategoryData(newCategory);
        setCategoryName('');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                label={'New category name'}
                variant="outlined"
                value={categoryName}
                onChange={categoryNameChangeHandler}
                sx={{ width: 320, my: 1, mr: 3 }}
            />

            <Button
                variant="contained"
                disabled={isAddButtonDisabled}
                onClick={addNewCategoryHandler}
                sx={{ width: 80, height: 40, my: "auto" }}
            >
                Add
            </Button>
        </Box>
    )
};

export default NewCategory;

