import { useState } from 'react';

import { storage } from "../../util/firebase";
import { ref, uploadBytes } from 'firebase/storage';

import { useSelector } from 'react-redux';

import { Button, Typography, Stack } from "@mui/material";

const NewAttachment = (props) => {

    const loggedUserId = useSelector(state => state.auth.userData.uid);

    const [uploadFile, setUploadFile] = useState(null);

    const sendFileHandler = () => {
        const storageRef = ref(storage, `${props.taskId}/${uploadFile.name}`);
        const metadata = {
            customMetadata: {
                author: loggedUserId
            }
        };

        uploadBytes(storageRef, uploadFile, metadata).then((snapshot) => {
            props.onSendFile(snapshot.ref)
            setUploadFile(null);
        })
    };

    return (


        <Stack direction='row' spacing={1} sx={{ my: 1 }}>
            <Button variant="outlined" component="label">
                Add file
                <input
                    hidden
                    accept="*"
                    type="file"
                    onChange={(e => setUploadFile(e.target.files[0]))}
                />
            </Button>

            <Button
                variant="outlined"
                disabled={!uploadFile}
                onClick={sendFileHandler}
                sx={{ ml: 1 }}
            >
                Send file
            </Button>

            <Typography
                variant='body2'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <b>{uploadFile ? uploadFile.name : ' No file chosen'}</b>
            </Typography>
        </Stack>

    )
};

export default NewAttachment;