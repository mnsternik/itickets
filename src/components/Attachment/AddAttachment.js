import { useState } from 'react';

import { storage } from "../../util/firebase";
import { ref, uploadBytes } from 'firebase/storage';

import { Button, Box } from "@mui/material";

const AddAttachment = (props) => {

    const [uploadFile, setUploadFile] = useState(null);

    const sendFileHandler = () => {
        const storageRef = ref(storage, `${props.taskId}/${uploadFile.name}`);
        uploadBytes(storageRef, uploadFile).then((snapshot) => {
            console.log('file uploaded')
        })
    };

    return (
        <Box sx={{ my: 2 }}>

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
            >
                Send file
            </Button>

        </Box>

    )
};

export default AddAttachment;