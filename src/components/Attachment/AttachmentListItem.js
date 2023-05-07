import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { storage } from '../../util/firebase';
import { ref, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';

import { Box, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AttachmentListItem = (props) => {

    const loggedUserId = useSelector(state => state.auth.userData.uid);

    const [fileUrl, setFileUrl] = useState('');
    const [fileSize, setFileSize] = useState();
    const [customMetadata, setCustomMetadata] = useState({});
    // this could be done be reducer

    const { fullPath: filePath, onError } = props;

    const showDeleteIcon = customMetadata.authorId === loggedUserId;

    // getting file's metadata and URL
    useEffect(() => {
        const fileRef = ref(storage, filePath);

        getMetadata(fileRef)
            .then(metadata => {
                setCustomMetadata(metadata.customMetadata)
                setFileSize(metadata.size)
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


    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) {
            return sizeInBytes + ' B';
        } else if (sizeInBytes < 1024 * 1024) {
            return (sizeInBytes / 1024).toFixed(2) + ' KB';
        } else {
            return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
    };


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
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',

            p: 1
        }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mb: 1
            }}>
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}
                >
                    {`- ${props.name} (${formatFileSize(fileSize)})`}
                </a>
                {showDeleteIcon && <DeleteIcon onClick={deleteItemHandler} />}
            </Box>

            <Typography variant='subtitle2'>
                {`Uploaded at ${customMetadata.uploadDate} by ${customMetadata.authorName}`}
            </Typography>

        </Paper>
    )
}

export default AttachmentListItem;