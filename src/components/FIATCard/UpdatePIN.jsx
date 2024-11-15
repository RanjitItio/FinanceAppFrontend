import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../Authentication/axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import PinInput from 'react-pin-input';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: 370, sm:400},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



//// Update FIAT Card PIN
export default function UpdateFiatCardPIN({open, setOpen, availableCardDetail}) {
    const handleClose = ()=> {setOpen(false)}
    const [pin, setPin] = React.useState('');  ////  PIN value
    const [error, setError] = React.useState('');  //// Error Message
    const [successMessage, setSuccessMessage] = React.useState('');  //// Success Message
    const [openSnackBar, setOpenSnackBar] = React.useState(false);  //// Open snackbar
    
    

    ///// Create New PIN
    const handleSubmitPIN = ()=> {
        if (!pin) {
            setOpenSnackBar(true);
            setError('Please provide PIN');

        } else {
            setOpenSnackBar(false)
            setError('');

            axiosInstance.put(`/api/v7/user/update/fiat/card/pin/`, {
                card_id: availableCardDetail.id,
                pin: pin

            }).then((res)=> {
                // console.log(res)

                setTimeout(() => {
                    setOpenSnackBar(false);
                    setSuccessMessage('');
                }, 3000);

                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessage('PIN Created Successfully')
                    setOpenSnackBar(true);
                    setOpen(false);
                }

            }).catch((error)=> {
                // console.log(error)

                setTimeout(() => {
                    setOpenSnackBar(false);
                    setError('');
                }, 3000);

                if (error.response.data.message === 'Invalid Card') {
                    setError('Invalid Card, Please try after some time');
                    setOpenSnackBar(true);

                } else if (error.response.data.message === 'Please set four digit pin') {
                    setError('Please provide four digit PIN');
                    setOpenSnackBar(true);
                }
            })
        }
    };


    return (
        <>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: 400,
                            width: '100%',
                            height: '40vh',
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'fixed',
                                top: 0,
                                width: '100%',
                                maxWidth: 400,
                                backgroundColor: 'white',
                                zIndex: 1,
                                padding: 2,
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6">PIN</Typography>

                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Scrollable Content */}
                        <Box
                            sx={{
                                flex: 1,
                                marginTop: '50px', 
                                overflowY: 'auto',
                                width: '100%',
                                padding: 2,
                            }}
                        >

                        <PinInput 
                            type="numeric" 
                            length={4} 
                            secret
                            secretDelay={200}
                            onComplete={(value, index) => setPin(value)}
                            inputStyle={{borderColor: '#0081cf'}}
                            inputFocusStyle={{borderColor: '#c4fcef'}}
                            style={{display:'flex', justifyContent:'center'}}
                        />
                           

                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                sx={{ backgroundColor: '#9b59b6', marginTop: 2 }}
                                onClick={handleSubmitPIN}
                            >
                                SUBMIT
                            </Button>

                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>

        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={()=> setOpenSnackBar(false)}
            // action={Snackaction}
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
};