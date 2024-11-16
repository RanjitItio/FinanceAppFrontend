import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axiosInstance from '../Authentication/axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



////// Delete Fiat Card
export default function DeleteFiatCard({open, setOpen, availableCardDetail}) {
    const handleClose = () => setOpen(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('') //// Success Message
    const [error, setError] = React.useState('') //// Error Message


    
    ////// Delete FIAT Card
    const handleDeleteFIATCard = ()=> {
        axiosInstance.delete(`/api/v7/user/fiat/card/?card_id=${availableCardDetail.id}`).then((res)=> {
            // console.log(res)

            setTimeout(() => {
                setOpenSnackBar(false)
                setSuccessMessage('');
            }, 2500);

            if (res.status === 200) {
                setOpenSnackBar(true)
                setSuccessMessage('Card Deleted Successfully')
                setOpen(false);
                location.reload()
            }
        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setOpenSnackBar(false)
                setError('');
            }, 2500);

            if (error.response.data.message === 'Invalid Card') {
                setOpenSnackBar(true);
                setError('Invalid Card')
            }
        })
    };

    //// Snackbar Action
    const Snackaction = (
        <React.Fragment>
        
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={()=> setOpenSnackBar(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );
  
    return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Delete {availableCardDetail.currency} Card
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2, color:'#f2846c' }}>
               Are you sure, You want to delete the Card?
            </Typography>

            <Box sx={{display:'flex', justifyContent:'flex-end', mt:5}}>
                <Button variant="contained" onClick={handleDeleteFIATCard}>Confirm</Button>
            </Box>
          </Box>
        </Modal>
      </div>

    <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={()=> setOpenSnackBar(false)}
        action={Snackaction}
    >
        <Alert
            onClose={()=> setOpenSnackBar(false)}
            severity={error ? 'warning' : successMessage ? 'success' : 'warning'}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {error || successMessage}
        </Alert>
    </Snackbar>

    </>

    );
}