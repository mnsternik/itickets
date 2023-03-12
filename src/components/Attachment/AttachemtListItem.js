import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { storage } from '../../util/firebase';
import { ref, getDownloadURL, getBlob } from 'firebase/storage';

const AttachemntListItem = (props) => {

    const [fileUrl, setFileUrl] = useState('');

    const { fullPath: storagePath } = props;

    const downloadFile = () => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = props.filename;
        document.body.appendChild(link);
        link.click();
    }


    useEffect(() => {
        const storageRef = ref(storage, storagePath);




        getDownloadURL(storageRef).then(url => {
            setFileUrl(url)
        })

        // getBlob(storageRef).then(res => {
        //     setFileUrl(URL.createObjectURL(res))
        // })
    }, [storagePath])


    return (
        <button onClick={downloadFile}>{props.name}</button>
    )
}

export default AttachemntListItem;