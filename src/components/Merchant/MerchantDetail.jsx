import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));




export default function MerchantDetails({...props}) {
  const navigate = useNavigate();

    // const [messageValue, updateMessageValue] = useState(props.MerchantDetail?.bsn_msg)

    const handleClose = () => {
        props.setMerchantDetailOpen(false);
    };

    // const handleEditRedirect = ()=> {
    //     navigate('/edit/merchant/')
    // }

    const getStatusColor = (status) => {
      switch (status) {
          case 'Moderation':
              return 'orange';
          case 'Approved':
              return 'green';
          case 'Cancelled':
              return 'red';
          default:
              return 'black'; // Default color if status is undefined or doesn't match
      }
  };

  const status = props.MerchantDetail?.status || 'NA';
  const color  = getStatusColor(status);


  return (

    <React.Fragment>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.merchantdetailOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Merchant Details
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Grid container spacing={2} alignItems="center">

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <List>
                    <ListItem
                        disablePadding
                        className="mb-2 shadow border border-secondary"
                        >
                        <ListItemButton>
                        <ListItemAvatar>
                            <img
                            src={props.MerchantDetail?.logo}
                            alt="Merchant logo"
                            style={{ maxWidth: '50px', maxHeight: '50px', overflow: 'auto' }}
                            />
                        </ListItemAvatar>

                        {/* First Item */}
                        <ListItemText
                            primary={
                            <>
                                <p>Merchant Details</p>
                            </>
                            }
                            secondary={
                            <span className="font-weight-bold">ID: {props.MerchantDetail?.merchant_id || 'NA'}</span>
                            }
                            sx={{ textAlign: 'left', marginLeft: '5%' }}
                            />

                        {/* Second Item */}
                        <ListItemText
                            primary={
                            <>
                                {/* <button type='button' className='btn btn-primary' onClick={handleEditRedirect}>Edit Merchant</button> */}
                            </>
                            }
                            sx={{textAlign: 'right'}}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className='d-flex justify-content-start'>
                    <p className='fs-5'><b>{props.MerchantDetail?.bsn_name || 'NA'}</b></p> 
                    <small style={{color: color}}>{status}</small>
                </div>

                <a href={props.MerchantDetail?.bsn_url || 'NA'} target='_blank'>{props.MerchantDetail?.bsn_url || 'NA'}</a>

                <br /><br />

                <p>Currency</p>
                <p className='fs-6'><b>{props.MerchantCurrency?.name || 'NA'}</b></p>

                <br />

                <p>Created on</p>
                <p className='fs-6'><b>{props.MerchantDetail?.created_date} {props.MerchantDetail?.created_time}</b></p>

            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Textarea 
                    color="primary"
                    minRows={8} 
                    placeholder='Message'
                    sx={{marginBottom: 2, width: '100%', maxHeight: '350px'}}
                    readOnly
                    value={props.MerchantDetail?.bsn_msg}
                />
            </Grid>

          </Grid>
        </DialogContent>

        
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {/* Close */}
          </Button>
          <Button autoFocus onClick={handleClose}>
             {/* Generate Form */}
          </Button>
        </DialogActions>

      </BootstrapDialog>
    </React.Fragment>
  );
}
