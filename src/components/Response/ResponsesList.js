import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readResponseData, deleteResponse } from '../../lib/api';
import Response from "./Response"
import { Box, Button } from "@mui/material"


const ResponsesList = (props) => {

    const { taskData } = props;

    const params = useParams();
    const { taskId } = params;

    const [showResponsesList, setShowResponsesList] = useState(false);
    const [responses, setResponses] = useState([]);


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
                resId={response.id}
                resAuthor={response.author}
                createDate={response.createDate}
                message={response.message}
                visibility={response.visibility}
                taskAuthor={taskData.author}
                taskId={taskData.id}
                onDelete={deleteResponseHandler}
            />
        ));

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={toggleResponsesList} disabled={!responses.length}>
                {showResponsesList ? 'Hide responses' : `Show responses (${responses.length})`}
            </Button>

            {showResponsesList && responsesList}
        </Box>


    )
};

export default ResponsesList