import { useSelector } from "react-redux";

import { Paper, Typography, Box, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


const Response = (props) => {

    const {
        resAuthor,
        taskAuthor,
        resId,
        taskId,
        createDate,
        visibility,
        message
    } = props;


    const user = useSelector(state => state.auth.username);
    // private response is visiable only to the author of task and author of response
    const showResponse = visibility === 'Public' || (visibility === 'Private' && (taskAuthor === user || resAuthor === user))

    const deleteResponseHandler = (event) => {
        props.onDelete(taskId, resId);
    }

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            pt: 1,
            my: 2
        }}>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'light', mb: 2 }}> {resAuthor}, {createDate} </Typography>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mb: 2, pl: 2 }}> {visibility} </Typography>

                </Box>
                <Box>
                    <IconButton aria-label="delete" onClick={deleteResponseHandler} sx={{ alignSelf: 'flex-end' }} >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>

            <Typography variant='subtitle1'>{showResponse ? message : '[Private response]'}</Typography>
        </Paper>
    )
}

export default Response; 