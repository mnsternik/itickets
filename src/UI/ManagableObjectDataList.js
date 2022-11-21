import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useHttp from '../hooks/useHttp';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';

const ManagableObjectDataList = (props) => {

    const [inputValue, setInputValue] = useState('');

    const { title, inputLabel, listItems, url, fetchDataFunc } = props;

    const dispatch = useDispatch();

    const { isLoading, error: sendListError, sendRequest: sendList } = useHttp();

    useEffect(() => {
        dispatch(fetchDataFunc());
    }, [dispatch, fetchDataFunc])

    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    };

    const addItemHandler = () => {
        const updatedList = listItems.slice();
        updatedList.push(inputValue);
        sendList({
            url: url,
            method: 'PUT',
            body: updatedList
        }, () => dispatch(fetchDataFunc()));
        setInputValue('');
    };

    const removeItemHandler = (clickedItem) => {
        const updatedList = listItems.filter(item => item !== clickedItem);
        sendList({
            url: url,
            method: 'PUT',
            body: updatedList
        }, () => dispatch(fetchDataFunc()))
        setInputValue('');
    };

    let message;
    if (isLoading) {
        message = <CircularProgress sx={{ m: 'auto' }} />
    }
    else if (sendListError) {
        message = `Failed to fetched ${title.toLowerCase()}`;
    }
    else if (!listItems.length && !sendListError) {
        message = `There is no ${title.toLowerCase()} yet.`;
    }

    const dataList = listItems.map(item => {
        return (
            <Box key={item}>
                <ListItem
                    sx={{ width: 220 }}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeItemHandler(item)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemText primary={item} />
                </ListItem>
                <Divider sx={{ width: 300 }} />
            </Box>
        )
    });

    return (
        <Paper
            sx={{
                minHeight: '500px',
                p: 4,
                my: 4,
                display: 'flex',
                flexDirection: 'column',
            }}>

            <Typography sx={{ mu: 2 }} variant="h5" component="div">
                {title}
            </Typography>

            <Typography variant='subtitle2' sx={{ py: 3 }}>
                {message}
            </Typography>

            <List dense={false} sx={{ display: 'flex', flexDirection: 'column', my: 1 }} >
                {dataList}
            </List>

            <TextField
                id={inputLabel}
                label={inputLabel}
                autoComplete="off"
                variant="outlined"
                value={inputValue}
                onChange={inputChangeHandler}
                sx={{ width: 180, my: 1 }}
            />

            <Button
                variant="contained"
                onClick={addItemHandler}
                size='large'
                sx={{ width: 180, my: 1 }}
            >
                Add
            </Button>

        </Paper>
    );
};

export default ManagableObjectDataList;

/*const expectedUsersData = {
    title: props.title,
    label: props.label,
    fetchFunc: props.fetchFunc,
    url: props.url,
    users: [
        { name: user[0].name, mail: user[0].mail, isAdmin: user[0].isAdmin, group: user[0].group }
    ]
    //isAdmin - select (true || false), group - select (like Categories) 
}
*/