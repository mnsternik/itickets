import { useState, useEffect, useCallback } from 'react';
import { storage } from '../../util/firebase';
import { ref, listAll } from 'firebase/storage';

import AttachmentsList from './AttachmentsList';
import NewAttachment from './NewAttachment';

import { Stack } from '@mui/material';


const Attachments = (props) => {

    const [filesList, setFilesList] = useState([]);
    const [error, setError] = useState(null);

    const { taskId } = props;

    useEffect(() => {
        const filesRef = ref(storage, taskId);
        listAll(filesRef)
            .then((res) => {
                setFilesList(res.items)
            }).catch((error) => {
                setError(error);
            });
    }, [taskId])


    //updates list on client side
    const addAttachmentHandler = (newAttachment) => {
        setFilesList([...filesList, newAttachment])
    };

    //updates list on client side
    const deleteAttachmentHandler = (filePath) => {
        const updatedList = filesList.filter(file => file.fullPath !== filePath)
        setFilesList(updatedList);
    };

    const errorHandler = useCallback((error) => {
        setError(error);
    }, [])

    return (
        <Stack spacing={1} sx={{ my: 1 }}>

            <AttachmentsList
                files={filesList}
                onError={errorHandler}
                onDeleteFile={deleteAttachmentHandler}
            />

            <NewAttachment
                taskId={taskId}
                onError={errorHandler}
                onSendFile={addAttachmentHandler}
            />

            {error}

        </Stack>
    )
}

export default Attachments;