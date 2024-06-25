import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axiosInstance from '../Authentication/axios';
import { useState, useEffect } from 'react';





export default function GenerateSecretKey({open, setOpen, callApi, businessID, setCallApi}) {

    const [secretKey, updateSecretKey]    = useState('');   //Update the secret key After fetching from API
    const [coppyMessage, setCoppyMessage] = useState('');   //State to show copy message

  //Close the Dialogue Box
  const handleClose = () => {
    setOpen(false);
  };



  const fetchMerchantSecretKey = ()=> {
      if (callApi) {
        axiosInstance.get(`api/merchant/secret/key/?query=${businessID}`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.data) {
                updateSecretKey(res.data.data)
            }
        }).catch((error)=> {
            console.log(error)
    
        })
      }
  };


  useEffect(() => {
    if (callApi) {
      fetchMerchantSecretKey();
      setCallApi(false);
    }
  }, [callApi]);


  const handleCopy = ()=> {
    navigator.clipboard.writeText(secretKey)
    setCoppyMessage('Coppied successfully')
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
          {"Generate New Secret Key"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Previous key has been deleted permanently. <br />

            <MoreHorizIcon /><MoreHorizIcon /><MoreHorizIcon /><MoreHorizIcon /> 

            <Tooltip title="Copy Key">
                <IconButton onClick={handleCopy}>
                    <ContentCopySharpIcon />
                </IconButton>
            </Tooltip>
            {coppyMessage &&<small style={{color:'green'}}>{coppyMessage}</small>}
            

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
