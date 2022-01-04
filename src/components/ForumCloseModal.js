import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useState from 'react'
import GAButton from './Button';
import { Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "3px",
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ForumCloseModal(props) {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const history = useHistory()

  return (
    <div>
      {/* <Button onClick={props.handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you wish to cancel this post? This action cannot be undone.
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.message}
          </Typography>
          <br />
          {props.message === "It looks like your profile is incomplete. Please enter a bio below." ? props.addBio() : null}
          {/* <br /> */}
          <Stack direction="row" spacing={2}>
            <GAButton onClick={props.action}>{props.buttonB}</GAButton>
            <GAButton onClick={props.handleClose}>{props.buttonA}</GAButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}