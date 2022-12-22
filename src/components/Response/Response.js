import { useSelector } from "react-redux";

import { Paper, Typography, Box, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


const Response = (props) => {

    const {
        responseAuthor,
        responseAuthorId,
        taskAuthorId,
        responseId,
        taskId,
        createDate,
        visibility,
        message
    } = props;

    const userData = useSelector(state => state.auth.userData);

    // private response is visiable only to the author of task and author of response
    const showResponse = visibility === 'Public' || (taskAuthorId === userData.uid || responseAuthorId === userData.uid);

    const showDeleteIcon = userData.uid === responseAuthorId;

    const deleteResponseHandler = () => {
        props.onDelete(taskId, responseId);
    };

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3
        }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Typography
                    variant='subtitle2'
                    sx={{ fontWeight: 'light', mb: 2 }}
                >
                    {responseAuthor}, {createDate} | <strong>{visibility}</strong>
                </Typography>

                {showDeleteIcon && <IconButton onClick={deleteResponseHandler} sx={{ left: 20, bottom: 20 }}>
                    <DeleteIcon />
                </IconButton>}

            </Box>

            <Typography variant='subtitle1'>
                {showResponse ? message : '[Private response]'}
            </Typography>

        </Paper>
    )
};

export default Response; 