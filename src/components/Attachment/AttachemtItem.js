import { useState, useEffect } from 'react';
import { storage } from '../../util/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const AttachemntItem = (props) => {

    const [fileUrl, setFileUrl] = useState('');

    const { fullPath: storagePath } = props;

    useEffect(() => {
        const storageRef = ref(storage, storagePath);

        getDownloadURL(storageRef).then(url => {
            setFileUrl(url)
        })
    }, [storagePath])


    return (
        <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            download
            style={{ color: 'white' }}
        >
            - {props.name}
        </a>
    )
}

export default AttachemntItem;