import { useState, useEffect } from "react";
import { readAllTasksData, archiveTasks } from "../lib/api";

import { Typography, Paper, TextField, Button, Stack, Box } from "@mui/material";

const Archiving = () => {

    const [allTasks, setAllTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const [archTimeFrame, setArchTimeFrame] = useState(12);

    useEffect(() => {
        readAllTasksData(setAllTasks)
    }, [])

    const timeFrameChangeHandler = (event) => {
        // validation...
        setArchTimeFrame(event.target.value);
    };

    const archiveTasksHandler = () => {
        console.log('archive start')
        archiveTasks(archTimeFrame)
    };

    return (
        <Paper sx={{ p: 4 }}>
            <Stack spacing={2}>
                <Typography variant="h5">
                    Archiving
                </Typography>

                <Typography variant="body2">
                    Number of tasks in main databse: {allTasks.length}
                </Typography>

                <Typography variant="body2">
                    Number of tasks in archive databse: {archivedTasks.length}
                </Typography>

                <Box>
                    <TextField
                        label='Archive tasks older than (months)'
                        size='small'
                        value={archTimeFrame}
                        onChange={timeFrameChangeHandler}
                        sx={{ mr: 2 }}
                    />

                    <Button variant='contained' onClick={archiveTasksHandler}>
                        Archive
                    </Button>
                </Box>
            </Stack>
        </Paper>

    )
}

export default Archiving; 