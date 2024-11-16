import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../Authentication/axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';


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
  

//// Format datetime into card date month
const DateTimeFormat = (dateString)=> {
    const date = new Date(dateString)
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;

    return formattedDate
};



///// Update Fiat Card
export default function UpdateFiatCard({open, setOpen, availableCardDetail}) {
    const handleClose = () => setOpen(false);
    const [error, setError] = React.useState('') //// Error Message
    const [successMessage, setSuccessMessage] = React.useState('') //// Success Message
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const [formData, updateFormData] = React.useState({
        card_name: availableCardDetail?.card_name || '',  
        status: availableCardDetail?.status || ''
    }); //// Fomr data

    
    //// Update formDat when the page loads
    useEffect(() => {
        updateFormData({
            card_name: availableCardDetail?.card_name || '',
            status: availableCardDetail?.status || ''
        })
    }, [availableCardDetail]);

    

    //// Set Form data value
    const handleChangeFormData = (e)=> {
        const { name, value } = e.target;

        if (name === 'card_name' && value.length > 25) {
            setError('Name should not greate than 20 letters');
            setOpenSnackBar(true);

        } else if (name === 'card_name' && !/^[A-Za-z\s]*$/.test(value)) {
            setError('Only Letters Accepted');
            setOpenSnackBar(true);

        } else {
            setOpenSnackBar(false);
            setError('');
            updateFormData({...formData,
                [name]: value
            })
        }
    };


    //// Method to update card details
    const handleUpdateCardDetails = ()=> {
        if (!formData.card_name) {
            setError('Please provide card name')
            setOpenSnackBar(true);

        } else if (!formData.status){
            setError('Please select card status')
            setOpenSnackBar(true);

        } else {
            setError('')
            setOpenSnackBar(false);

            axiosInstance.put(`/api/v7/user/fiat/card/`, {
                card_name: formData.card_name,
                status: formData.status,
                card_id: availableCardDetail.id

            }).then((res)=> {
                // console.log(res)

                setTimeout(() => {
                    setSuccessMessage('');
                    setOpenSnackBar(false)
                }, 2000);

                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessage('Card Updated Successfully');
                    setOpenSnackBar(true);
                    setOpen(false)
                }

            }).catch((error)=> {
                // console.log(error);
                setTimeout(() => {
                    setSuccessMessage('');
                    setOpenSnackBar(false)
                }, 2000);

                if (error.response.data.message === 'Invalid Card')  {
                    setOpenSnackBar(true);
                    setError('Invalid Card')
                }
            })
        }
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
                            height: '80vh',
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
                            <Typography variant="h6">Update Card</Typography>

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

                            <TextField
                                label="Card Name"
                                name='card_name'
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                                // size='medium'
                                value={formData.card_name}
                                onChange={handleChangeFormData}
                            />

                            <TextField
                                label="Card Number"
                                name='card_number'
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                                value={availableCardDetail.card_number}
                                size='medium'
                            />

                            <TextField
                                label="CVV"
                                name='cvv'
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                                size='medium'
                                value={availableCardDetail.cvv}
                            />

                            <TextField
                                label="Expiry"
                                name='expiry'
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                                value={DateTimeFormat(availableCardDetail.valid_thru)}
                                size='medium'
                            />

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    id="status"
                                    label="Status"
                                    name='status'
                                    value={formData.status}
                                    onChange={handleChangeFormData}
                                    >
                                    <MenuItem value='Active'>Active</MenuItem>
                                    <MenuItem value='Inactive'>Inactive</MenuItem>
                                </Select>
                            </FormControl>
                           

                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                sx={{ backgroundColor: '#9b59b6', marginTop: 2 }}
                                onClick={handleUpdateCardDetails}
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
};