import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axiosInstance from '../../Authentication/axios';





export default function BankAccountDelete({open, setOpen, accountID}) {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage]     = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBankAccount = ()=> {
      axiosInstance.delete(`api/v4/merchant/bank/?query=${accountID}`).then((res)=> {
        // console.log(res)
        if (res.status === 200) {
            setSuccessMessage('Deleted successfully');

            setTimeout(() => {
                setOpen(false)
            }, 1000);
            
        };

      }).catch((error)=> {
        console.log(error)

        if (error.response.data.msg === 'Requested Account not found') {
            setErrorMessage('Account does not Exists')
        };
      })
  };


  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Bank Account!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, You want to delete your Bank account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={handleDeleteBankAccount}>
            Agree
          </Button>    
        </DialogActions>

        {successMessage && <p style={{color:'green', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>{successMessage}</p>}
        {errorMessage && <p style={{color:'red', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>{errorMessage}</p>}
      </Dialog>
    </React.Fragment>
  );
}
