import useHttp from '../../../hooks/useHttp';
import { fetchTasksData } from '../../../store/tasks';
import Response from "./Response"

import { Box } from "@mui/system"


const ResponsesList = (props) => {

    const { taskData, onTaskUpdate } = props;

    const { sendRequest: deleteResponse } = useHttp();

    const deleteResponseHandler = (responseId) => {
        const taskUrl = `https://iticket-fd059-default-rtdb.firebaseio.com/tasks/${taskData.firebaseKey}.json`;
        const updatedResponses = taskData.responses.filter(res => responseId !== res.id);
        const updatedTask = { ...taskData, responses: updatedResponses };

        deleteResponse({
            url: taskUrl,
            method: 'PUT',
            body: updatedTask,
        }, fetchTasksData);

        onTaskUpdate(updatedTask);
    }

    const responsesList = taskData.responses.map(response => (
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

    return (
        <Box>
            {responsesList}
        </Box>
    )
}

export default ResponsesList