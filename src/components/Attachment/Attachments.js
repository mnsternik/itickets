import { useState, useEffect } from 'react';
import { storage } from '../../util/firebase';
import { ref, listAll } from 'firebase/storage';

import AttachemntItem from './AttachemtItem';
import NewAttachment from './NewAttachment';

import { Stack, Button } from '@mui/material';


const Attachemnts = (props) => {

    const [uploadedFilesList, setUploadedFilesList] = useState([]);
    const [showFilesList, setShowFilesList] = useState(false);
    const [error, setError] = useState(null);

    const { taskId } = props;

    useEffect(() => {
        const storageRef = ref(storage, taskId);
        listAll(storageRef)
            .then((res) => {
                setUploadedFilesList(res.items)
            }).catch((error) => {
                setError(error);
            });
    }, [taskId])

    const toggleFilesListHandler = () => {
        setShowFilesList(show => !show)
    };

    const updateAttachmentsListHandler = (newAttachment) => {
        const updatedList = [...uploadedFilesList]
        updatedList.push(newAttachment);
        setUploadedFilesList(updatedList);
        //setUploadedFilesList([...uploadedFilesList, newAttachment])
    };

    const filesList = uploadedFilesList.map(file => (
        <AttachemntItem
            key={file.name}
            name={file.name}
            fullPath={file.fullPath}
        />
    ));

    return (
        <Stack spacing={1} sx={{ my: 1 }}>
            <Button
                disabled={!filesList.length}
                onClick={toggleFilesListHandler}
            >
                {showFilesList ? 'Hide attachments' : `Show attachments (${filesList.length})`}
            </Button>

            {showFilesList && filesList}

            <NewAttachment taskId={taskId} onSendFile={updateAttachmentsListHandler} />

        </Stack>
    )
}

export default Attachemnts;