import { useState, useEffect } from "react";
import { readAllTasksData, archiveTasks, readArchivedTasks } from "../lib/api";

import { Typography, Paper, TextField, Button, Stack, Box, Alert } from "@mui/material";

const Archiving = () => {

    const [allTasks, setAllTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const [archiveThresholdInDays, setArchiveThresholdInDays] = useState(365);
    const [showAlert, setShowAlert] = useState(false);

    const tasksToArchive = allTasks.filter((task) => {
        const cutoff = Date.now() - archiveThresholdInDays * 24 * 60 * 60 * 1000; // days converted to miliseconds
        const taskDate = new Date(task.modificationDate);
        if (!archiveThresholdInDays.length) {
            return false;
        }
        return taskDate.getTime() < cutoff;
    });

    useEffect(() => {
        readAllTasksData(setAllTasks);
        readArchivedTasks(setArchivedTasks);
    }, [])

    const timeFrameChangeHandler = (event) => {
        setArchiveThresholdInDays(event.target.value);
    };

    const archiveTasksHandler = () => {
        archiveTasks(archiveThresholdInDays)
    };

    return (
        <Paper sx={{ p: 4 }}>
            <Stack spacing={2}>
                <Typography variant="h5">
                    Archiving
                </Typography>

                <Typography variant="body1">
                    Tasks in main: <strong>{allTasks.length}</strong>
                </Typography>

                <Typography variant="body1">
                    Tasks in main older than <strong>{archiveThresholdInDays}</strong> days: <strong>{tasksToArchive.length}</strong>
                </Typography>

                <Typography variant="body1">
                    Tasks in archive: <strong>{archivedTasks.length}</strong>
                </Typography>

                <Box>
                    <TextField
                        label='Days'
                        helperText='Archive tasks older than (days)'
                        type='number'
                        value={archiveThresholdInDays}
                        onChange={timeFrameChangeHandler}
                        sx={{ mr: 2, width: 260 }}
                    />

                    <Button
                        variant='contained'
                        color='error'
                        disabled={!tasksToArchive.length || !archiveThresholdInDays.length}
                        onClick={archiveTasksHandler}>
                        Archive
                    </Button>
                </Box>

                {showAlert && <Alert severity='success' onClose={() => setShowAlert(false)}>
                    {`Task older than ${archiveThresholdInDays} successfuly archived`}
                </Alert>}

            </Stack>
        </Paper>

    )
}

export default Archiving; 