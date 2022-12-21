import { useState } from 'react';

import { Modal, Alert, Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ModalAlert = (props) => {

    const [open, setOpen] = useState(true);
    const closeHandler = () => setOpen(false);

    return (
        <Modal open={open} onClose={closeHandler}>

            <Alert sx={style} severity={props.type}>

                <Typography variant='body2'>
                    {props.message}
                </Typography>

                <Button
                    onClick={closeHandler}
                    variant='outlined'
                    sx={{ mt: 2 }}
                >
                    OK
                </Button>
            </Alert>

        </Modal>
    );
};

export default ModalAlert; 