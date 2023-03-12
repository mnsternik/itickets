import { useState, useEffect } from 'react';
import { storage } from '../../util/firebase';
import { ref, listAll } from 'firebase/storage';

import { Stack } from '@mui/material';
import AttachemntListItem from './AttachemtListItem';

const AttachemntsList = (props) => {

    const [uploadedFilesList, setUploadedFilesList] = useState([]);
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


    const filesList = uploadedFilesList.map(file => (
        <AttachemntListItem
            key={file.name}
            name={file.name}
            fullPath={file.fullPath}
        />
    ));

    return (
        <Stack spacing={1}>
            {filesList}
        </Stack>
    )
}

export default AttachemntsList;