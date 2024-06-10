import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));




export default function MerchantHTMLFormGenerator({...props}) {

    const [formValue, updateFormValue] = useState(`
            <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pay Money</title>
        <script src="https://demo.paymoney.techvill.net/public/frontend/templates/js/flashesh-dark.min.js"></script>
       <link rel="stylesheet" href="https://demo.paymoney.techvill.net/public/dist/libraries/bootstrap-5.0.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://demo.paymoney.techvill.net/public/frontend/templates/css/style.min.css">
        <link rel="shortcut icon" href="https://demo.paymoney.techvill.net/public/uploads/logos/1530689937_favicon.png"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap">
         
        <style>
            body{font-family: "Plus Jakarta Sans", sans-serif;}h3 {font-weight: 500;font-family: "Plus Jakarta Sans", sans-serif !important;}p {font-weight: 400;font-family: "Plus Jakarta Sans", sans-serif !important;}button {font-weight: 400; font-family: "Plus Jakarta Sans", sans-serif !important;}
        </style>
     </head>
     
     <body class="bg-body-muted">
        <div class="container-fluid container-layout px-0">
            <div class="section-payment">
                <div class="payment-main-module">
                    <h3>You&#039;re almost there!</h3>
                    <p>Only a few steps to complete your payment. Click the button to continue.</p>
                    
                    <form method="POST" action="https://demo.paymoney.techvill.net/payment/form">

                            <input type="hidden" name="merchant" value="3764DB96ED5BB" />
                            <input type="hidden" name="merchant_id" value="12" />
                            <input type="hidden" name="item_name" value="Bottle" />
                            <input type="hidden" name="currency_id" value="1" />
                            <input type="hidden" name="order" value="990000" />
                            <input type="hidden" name="amount" value="200" />
                            <input type="hidden" name="custom" value="hhh" />

                        <button type="submit" class="btn btn-lg btn-primary">
                            <strong>Pay Now</strong>
                        </button>
                    </form>
                </div>
            </div>
        </div>
<script src="https://demo.paymoney.techvill.net/public/dist/libraries/jquery-3.6.1/jquery-3.6.1.min.js"></script>
<script src="https://demo.paymoney.techvill.net/public/dist/libraries/bootstrap-5.0.2/js/bootstrap.min.js"></script>
<script src="https://demo.paymoney.techvill.net/public/frontend/templates/js/main.min.js"></script>

</body>

</html>
        `)


    const handleClose = () => {
        props.setHtmlFormOpen(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(formValue).then(() => {
          alert('Text copied to clipboard');
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      };


  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.htmlFormOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Generate Form
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

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField 
                    id="merchant-id" 
                    label="Merchant ID" 
                    variant="outlined" 
                    placeholder='Merchant ID'
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
                <TextField 
                    id="item-name" 
                    label="Item Name" 
                    variant="outlined" 
                    placeholder='Item Name'
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
                <TextField 
                    id="order-number" 
                    label="Order Number" 
                    variant="outlined" 
                    placeholder='Order Number'
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
                <TextField 
                    id="price" 
                    label="Price" 
                    variant="outlined" 
                    placeholder='Price'
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
                <TextField 
                    id="custom" 
                    label="Custom" 
                    variant="outlined" 
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Textarea 
                    color="primary"
                    minRows={15} 
                    placeholder='Enter your Message here'
                    sx={{marginBottom: 2, width: '100%', maxHeight: '350px', overflow: 'auto'}}
                    readOnly
                    value={formValue}
                />
                   <ContentCopyIcon 
                      sx={{
                        position: 'absolute',
                        top: {md: 90, xs: 470},
                        right: 25,
                        zIndex: 1,
                        cursor: 'pointer'
                      }}
                      onClick={handleCopy}
                   />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button autoFocus onClick={handleClose}>
            Generate Form
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
