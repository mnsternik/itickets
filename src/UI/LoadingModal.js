import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';

const LoadingModal = () => {
  return (
    <Modal open={true} sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress sx={{ my: 'auto' }} />
    </Modal>
  );
}

export default LoadingModal;