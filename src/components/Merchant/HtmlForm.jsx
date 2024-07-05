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
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';


const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
let redirect_url = '';


if (IS_DEVELOPMENT === 'True') {
  redirect_url = 'http://localhost:5173/payment/form/'

} else {
  redirect_url = 'https://react-uat.oyefin.com/payment/form/'
}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));




export default function MerchantHTMLFormGenerator({...props}) {
    const initialFormData = {
      item_name: '',
      order_number: '',
      price: '',
      custom: '',
      redirect_url: ''
    }

    // console.log(props.merchantId.bsn_name)

    const [htmlData, updatehtmlFormData]             = useState(initialFormData);
    const [error, setError]                          = useState('');
    const [validAmountError, updateValidAmountError] = useState('');
    const [copyMessage, setCopyMessage]              = useState('');
    const [showDownloadIcon, setShowDownloadIcon]    = useState(true);
    const [itemError, setItemError]                  = useState('');
    const [orderError, setOrderError]                = useState('');
    const [redirectUrlError, setRedirectURLError]    = useState('');

    const [formValue, updateFormValue]               = useState(`
            <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Page</title>
                
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
                <style>
                  body {
                    background-color: #1b1b32;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                  }
                  .card {
                    background-color: #2c2c54;
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    padding: 25px;
                  }
                  .btn-primary {
                    background-color: #5865f2;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 16px;
                  }
                  .btn-primary:hover {
                    background-color: #4752c4;
                  }
                  @media (max-width: 576px) {
                    .card {
                      padding: 15px;
                    }
                    .btn-primary {
                      padding: 8px 16px;
                      font-size: 14px;
                    }
                  }
                </style>

                <script>
                  function RedirectFunc() {
                      window.location.replace("${redirect_url}");
                  }
                </script>

              </head>
              <body>
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-md-6 col-lg-4">
                      <div class="card text-center">
                        <div class="card-body">
                          <h5 class="card-title"><b>You're almost there!</b></h5>
                          <p class="card-text">Only a few steps to complete your payment. Click the button to continue.</p>

                          <form
                              method="GET"
                              action="${redirect_url}"
                            >
                            <input type="hidden" name="merchant" value="" />
                            <input type="hidden" name="merchant_id" value="" />
                            <input type="hidden" name="item_name" value="" />
                            <input type="hidden" name="order_number" value="" />
                            <input type="hidden" name="amt" value="" />
                            <input type="hidden" name="cur" value="" />
                            <input type="hidden" name="custom" value="" />
                            <button type="submit" class="btn btn-primary">Pay Now</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
              </body>
              </html>
        `)


    const handleClose = () => {
        props.setHtmlFormOpen(false);
    };

    const handleFormChange = (event)=> {
         const value = event.target.value

         updatehtmlFormData({
          ...htmlData,
          [event.target.name]: value
         })

         if (htmlData.item_name) {
             setItemError('')
         }
         if (htmlData.order_number) {
            setOrderError('')
         }

         if (htmlData.redirect_url) {
            setRedirectURLError('')
         }
         
    };
  
    const handleValidAmountChange = (event)=> {
          const value = event.target.value

          if (isNaN(value) || value.trim() === '') {
              updateValidAmountError('Please type valid amount')
          } else {
              updateValidAmountError('')
          }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(formValue).then(() => {
          // alert('Text copied to clipboard');
          setCopyMessage('Copied successfully')

          setTimeout(() => {
            setCopyMessage('')
          }, 4000);

        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      };

  const handleHtmlGenerate = ()=> {
    
    if (htmlData.item_name === '') {
       setItemError('Please type item name')
    } else if(htmlData.order_number === '') {
       setOrderError('Please type order number')
    } else if (htmlData.price === '') {
        setError('Please type item price')
    } else if (htmlData.custom === '') {
      setError('Please type any custome message')
    } else if (htmlData.redirect_url === '') {
      setRedirectURLError('Please type redirect url')

    } else {
      setError('')
      setItemError('')

      setShowDownloadIcon(false)

      const newHtmlData = {
        item_name:    htmlData.item_name,
        order_number: htmlData.order_number,
        price:        htmlData.price,
        custom:       htmlData.custom,
        redirect_url: htmlData.redirect_url
      }

      updatehtmlFormData(newHtmlData)

      // Form Name
      const merch_name        = 'merch_name'
      const name_merchant_key = 'merch_key'
      const name_merchant_id  = 'merch_id'
      const name_item_name    = 'item'
      const name_order_number = 'order_no'
      const name_price        = 'amt'
      const name_custom       = 'custom'
      const name_currency     = 'cur'
      const name_url          = 'url'
      // const redirect_url      = 'redirect'

      // Form Value
      let merchant_key   = props.merchantId.key
      let merchant_name = props.merchantId.bsn_name

      //Encode the key value in base64
      if (merchant_key) {
        merchant_key = btoa(merchant_key)
      } else {
        merchant_key = ''
      }

      //Encode the merchant name in base64
      if (merchant_name) {
        merchant_name = btoa(merchant_name)
      } else {
        merchant_name = ''
      }


    const merchant_id  = btoa(props.merchantId.merchant_id)
    const item_name    = btoa(newHtmlData.item_name)
    const order_number = btoa(newHtmlData.order_number)
    const price        = btoa(newHtmlData.price)
    const custom       = btoa(newHtmlData.custom)
    const currency     = btoa(props.MerchantCurrency.name)
    const url          = btoa(newHtmlData.redirect_url)



      const newFormValue = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Page</title>
        
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body {
            background-color: #1b1b32;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .card {
            background-color: #2c2c54;
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 25px;
          }
          .btn-primary {
            background-color: #5865f2;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
          }
          .btn-primary:hover {
            background-color: #4752c4;
          }
          @media (max-width: 576px) {
            .card {
              padding: 15px;
            }
            .btn-primary {
              padding: 8px 16px;
              font-size: 14px;
            }
          }
        </style>

      </head>
      <body>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title"><b>You're almost there!</b></h5>
                  <p class="card-text">Only a few steps to complete your payment. Click the button to continue.</p>

                  <form method="GET" action="${redirect_url}">
                    <input type="hidden" name="${merch_name}" value="${merchant_name}" />
                    <input type="hidden" name="${name_url}" value="${url}" />
                    <input type="hidden" name="${name_merchant_key}" value="${merchant_key}" />
                    <input type="hidden" name="${name_merchant_id}" value="${merchant_id}" />
                    <input type="hidden" name="${name_item_name}" value="${item_name}" />
                    <input type="hidden" name="${name_order_number}" value="${order_number}" />
                    <input type="hidden" name="${name_price}" value="${price}" />
                    <input type="hidden" name="${name_custom}" value="${custom}" />
                    <input type="hidden" name="${name_currency}" value="${currency}" />
                    <button type="submit" class="btn btn-primary">Pay Now</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
  `;

  updateFormValue(newFormValue)

    }

};


const handleDownload = ()=> {
  const element    = document.createElement('a');
  const file       = new Blob([formValue], {type: 'text/html'});
  element.href     = URL.createObjectURL(file)
  element.download = 'form.html'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// console.log(formValue)

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
                    value={props.merchantId.merchant_id}
                    variant="outlined" 
                    placeholder='Merchant ID'
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
                <TextField 
                    id="item-name" 
                    name='item_name'
                    label="Item Name" 
                    variant="outlined" 
                    placeholder='Item Name'
                    onChange={handleFormChange}
                    fullWidth 
                    sx={{marginBottom: 2}}
                    error={Boolean(itemError)}
                    helperText={itemError}
                    />
                <TextField 
                    id="order-number" 
                    name='order_number'
                    onChange={handleFormChange}
                    label="Order Number" 
                    variant="outlined" 
                    placeholder='Order Number'
                    fullWidth 
                    sx={{marginBottom: 2}}
                    error={Boolean(orderError)}
                    helperText={orderError}
                    />

                <small style={{float: 'right', color: 'green'}}>{props.MerchantCurrency.name}</small>
                <TextField 
                    id="price" 
                    name='price'
                    onChange={(event)=>{handleFormChange(event); handleValidAmountChange(event)}}
                    label="Price" 
                    variant="outlined" 
                    placeholder='Price'
                    fullWidth
                    sx={{marginBottom: 2}}
                    error={!!validAmountError}
                    helperText={validAmountError}
                    />
                    
                <TextField 
                    id="custom" 
                    name='custom'
                    onChange={handleFormChange}
                    label="Custom" 
                    variant="outlined" 
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
                <TextField 
                    id="redirect_url" 
                    name='redirect_url'
                    onChange={handleFormChange}
                    label="Redirect URL" 
                    variant="outlined" 
                    fullWidth 
                    sx={{marginBottom: 2}}
                    error={Boolean(redirectUrlError)}
                    helperText={redirectUrlError}
                    />
                <TextField 
                    id="webhook_url" 
                    name='webhook_url'
                    onChange={handleFormChange}
                    label="Webhook URL" 
                    variant="outlined" 
                    fullWidth 
                    sx={{marginBottom: 2}}
                    />
            {error && <p className='text-danger'>{error}</p>}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} sx={{marginBottom: 2, width: '100%', maxHeight: '350px', overflow: 'auto'}}>
            <small style={{marginLeft: '45%', color: 'green'}}>{copyMessage && copyMessage}</small>
                <Textarea 
                    color="primary"
                    minRows={15} 
                    readOnly
                    value={formValue}
                />
            </Grid>
            
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
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>

          <Button autoFocus onClick={handleHtmlGenerate}>
            Generate Form
          </Button>

          <Button disabled={showDownloadIcon} onClick={handleDownload}>
            <DownloadForOfflineIcon />
          </Button>

        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
