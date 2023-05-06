import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { storage } from '../../util/firebase';
import { ref, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';

import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AttachmentListItem = (props) => {

    const loggedUserId = useSelector(state => state.auth.userData.uid);

    const [fileUrl, setFileUrl] = useState('');
    const [fileAuthor, setFileAuthor] = useState('');

    const { fullPath: filePath, onError } = props;

    // getting file's author and URL
    useEffect(() => {
        const fileRef = ref(storage, filePath);

        getMetadata(fileRef)
            .then(metadata => {
                setFileAuthor(metadata.customMetadata.author)
            })
            .catch(error => {
                onError(error);
            });

        getDownloadURL(fileRef)
            .then(url => {
                setFileUrl(url)
            })
            .catch(error => {
                onError(error)
            })
    }, [filePath, onError])


    const deleteItemHandler = () => {
        const fileRef = ref(storage, filePath);
        deleteObject(fileRef)
            .then(() => {
                // updates files list on client
                props.onDeleteFile(filePath)
            })
            .catch(error => {
                onError(error)
            });
    };


    return (
        <Stack direction='row' spacing={1} sx={{
        }}>
            <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                style={{ color: 'white' }}
            >
                - {props.name}
            </a>
            {(fileAuthor === loggedUserId) && <DeleteIcon onClick={deleteItemHandler} />}
        </Stack>
    )
}

export default AttachmentListItem;