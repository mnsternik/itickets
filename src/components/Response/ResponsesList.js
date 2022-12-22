import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readResponseData, deleteResponse } from '../../lib/api';
import Response from "./Response"
import { Stack, Button } from "@mui/material"


const ResponsesList = (props) => {

    const params = useParams();
    const { taskId } = params;

    const { taskData } = props;

    const [responses, setResponses] = useState([]);
    const [showResponsesList, setShowResponsesList] = useState(false);

    useEffect(() => {
        readResponseData(taskId, setResponses);
    }, [taskId])


    const deleteResponseHandler = (taskId, responseKey) => {
        if (responses.length === 1) {
            setShowResponsesList(false);
        }
        deleteResponse(taskId, responseKey);
    };

    const toggleResponsesList = () => {
        setShowResponsesList(prevState => !prevState)
    };

    let responsesList;
    if (responses.length) {
        responsesList = responses.map(response => (
            <Response
                key={response.id}
                responseId={response.id}
                responseAuthor={response.author}
                responseAuthorId={response.authorId}
                createDate={response.createDate}
                message={response.message}
                visibility={response.visibility}
                taskAuthorId={taskData.authorId}
                taskId={taskData.id}
                onDelete={deleteResponseHandler}
            />
        ));
    }

    return (
        <Stack spacing={3}>

            <Button
                onClick={toggleResponsesList}
                disabled={!responses.length}
            >
                {showResponsesList ? 'Hide responses' : `Show responses (${responses.length})`}
            </Button>

            {showResponsesList && responsesList}

        </Stack>
    )
};

export default ResponsesList