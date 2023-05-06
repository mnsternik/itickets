import { useState } from "react";

import AttachmentListItem from "./AttachmentListItem";

import { Button } from "@mui/material";

const AttachmentsList = (props) => {

    const [showFilesList, setShowFilesList] = useState(false);

    const toggleFilesListHandler = () => {
        setShowFilesList(show => !show)
    };

    const filesList = props.files.map(file => (
        <AttachmentListItem
            key={file.name}
            name={file.name}
            fullPath={file.fullPath}
            onError={props.onError}
            onDeleteFile={props.onDeleteFile}
        />
    ));

    return (
        <>
            <Button
                disabled={!props.files.length}
                onClick={toggleFilesListHandler}
            >
                {showFilesList ? 'Hide attachments' : `Show attachments (${props.files.length})`}
            </Button>

            {showFilesList && filesList}
        </>

    )
};


export default AttachmentsList;