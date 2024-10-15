import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axiosInstance from '../Authentication/axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



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


// Raise wallet request
export default function RaiseWalletRequest({open, setOpen}) {
    const handleClose = () => setOpen(false);
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError]     = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    

    // Get selected Crypto Value
    const handleChangeSelectedCrypto = (e)=> {
        setSelectedCrypto(e.target.value);
    };

    const handleSubmitWalletRequest = ()=> {
        if (selectedCrypto === '') {
            setError(true)
            setErrorMessage('Please select Crypto')

            setTimeout(() => {
                setError(false)
            }, 2500);

        } else {

            axiosInstance.post(`/api/v1/user/crypto/wallet/`, {
                crypto: selectedCrypto
            }).then((res)=> {
                // console.log(res)
                
                if (res.status === 201) {
                    setSuccess(true)

                    setTimeout(() => {
                        setSuccess(false)
                        handleClose()
                    }, 2500);
                };
            }).catch((error)=> {
                // console.log(error)

                if (error.response.data.message === 'Wallet already exists for given crypto') {
                    setError(true)
                    setErrorMessage('Wallet already exists for given Crypto')

                    setTimeout(() => {
                        setError(false)
                    }, 2500);
                }
            })
        }
    };


    return (
       <div>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Crypto</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedCrypto}
                        label="Select Crypto"
                        onChange={handleChangeSelectedCrypto}
                        >
                        <MenuItem value='BTC'>BTC</MenuItem>
                        <MenuItem value='ETH'>ETH</MenuItem>
                        <MenuItem value='SOL'>SOL</MenuItem>
                        <MenuItem value='XRP'>XRP</MenuItem>
                        <MenuItem value='DOGE'>DOGE</MenuItem>
                        <MenuItem value='LTC'>LTC</MenuItem>
                        <MenuItem value='BNB'>BNB</MenuItem>
                    </Select>
                        
                    <FormHelperText>Select Crypto</FormHelperText>
                </FormControl>

                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" onClick={handleSubmitWalletRequest}>Submit</Button>
                </div>

                {success && 
                    <Alert severity="success" sx={{mt:1}}>
                        <AlertTitle>Success</AlertTitle>
                        Wallet Request Raised Successfully.
                    </Alert>
                }

                {error && 
                    <Alert severity="error" sx={{mt:1}}>
                        <AlertTitle>Error</AlertTitle>
                         {errorMessage && errorMessage}
                    </Alert>
                }

                </Box>
            </Modal>
        </div>
    )
};