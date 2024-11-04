import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PrintIcon from '@mui/icons-material/Print';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent } from '@mui/material';




//// Calculate Total Amount
const CalculateTotalAmount = (amount, fee)=> {
      const float_amount = parseFloat(amount)
      const float_fee    = parseFloat(fee)

      const totalAmount   = float_amount + float_fee
      const decimal_value = totalAmount.toFixed(6)

      return decimal_value
};


//// Specific Crypto Transaction detail
export default function CryptoSwapDetail({handleClose, boxOpen, specificTransactionDetails}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const iconSize   = isSmallScreen ? 32 : 40;
    const avatarSize = isSmallScreen ? 48 : 70;

    return (
        <React.Fragment>
            <Dialog
                open={boxOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth={true}
                maxWidth='sm'
            >
                <DialogTitle id="responsive-dialog-title">
                </DialogTitle>
                <DialogContent>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 mb-2">

                            <Card sx={{height: {xs:'20rem', sm:'24.5rem'}, backgroundColor: '#c3c2d5'}}>
                                <CardContent>

                                <Typography style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:20}} variant='div'>
                                    <Avatar sx={{ width: avatarSize, height: avatarSize, backgroundColor: '#a6a3d3'}} >
                                        <ArrowOutwardIcon sx={{fontSize: iconSize, color:'#4f47bc'}}/>
                                    </Avatar>
                                </Typography>

                                    <React.Fragment >
                                        {specificTransactionDetails ? 
                                            (<p className='d-flex justify-content-center'>Crypto swap amount</p>) : (
                                            <p className='d-flex justify-content-center'>amount</p>
                                            )
                                        }
                                        
                                        {specificTransactionDetails ? (

                                            <p className='d-flex justify-content-center mb-3 fs-5' style={{marginTop:-12}}>
                                                <b>{specificTransactionDetails?.from_crypto_name || ''} {specificTransactionDetails.swap_quantity ? parseFloat(specificTransactionDetails.swap_quantity).toFixed(7) : 0 }</b>
                                            </p>

                                        ) : (
                                            <p className='d-flex justify-content-center mb-3 fs-5'><b></b></p>
                                        )}
                                        
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:50}}>
                                            {specificTransactionDetails ? (
                                                <p>{specificTransactionDetails?.created_at?.split('T')[0] || ''} {specificTransactionDetails?.created_at?.split('T')[1] || ''}</p>
                                            ) : (
                                                <p>Transaction Date & time</p>
                                            )}
                                        </div>
                                        
                                        <div className='d-flex justify-content-center'>
                                            <Button variant="outlined" startIcon={<PrintIcon />}>
                                                Print
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className="card rounded">
                                <div className="card-body">
                                    <h5 className="card-title fs-5">Transaction Details</h5>
                                    <hr className='mb-3'/>

                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className='text-muted' style={{marginBottom:0.2}}>From Crypto</p>
                                            {specificTransactionDetails ? (

                                                <p>{specificTransactionDetails?.from_crypto_name || ''} {specificTransactionDetails.swap_quantity ? parseFloat(specificTransactionDetails.swap_quantity).toFixed(9) : 0 }</p>

                                            ) : (

                                                <p className='d-flex justify-content-end'></p>
                                            )}
                                        </div>


                                        <div>
                                            <p className='text-muted' style={{marginBottom:0.2}}>To Crypto</p>
                                            {specificTransactionDetails ? (
                                                <p className='d-flex justify-content-end'>{specificTransactionDetails?.to_crypto_name || ''} {specificTransactionDetails.credit_quantity ? parseFloat(specificTransactionDetails.credit_quantity).toFixed(6) : 0}</p>

                                            ) : (
                                                <p className='d-flex justify-content-end'></p>

                                            )}
                                        </div>
                                    </div>
                                    

                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <Typography variant='p' sx={{fontSize:{xs:'0.8rem'}}}>
                                                Transaction ID
                                            </Typography>

                                            {specificTransactionDetails ? (
                                                <Typography 
                                                sx={{
                                                    color:'gray', 
                                                    fontSize: {xs:'0.7rem'},
                                                    wordBreak: 'break-word',
                                                    maxWidth: '150px',
                                                    overflowWrap: 'break-word'
                                                    }}>
                                                    {specificTransactionDetails?.transaction_id || ''}
                                                </Typography>

                                            ) : (
                                                <small>Transaction Id</small>
                                            )
                                            }
                                        </div>

                                        <div>
                                            <Typography variant='p' sx={{fontSize:{xs:'0.8rem'}}}>
                                                Fee
                                            </Typography>

                                            {specificTransactionDetails ? (
                                                <Typography sx={{fontSize:{xs:'0.8rem'}, whiteSpace: 'nowrap'}}>
                                                    {`${specificTransactionDetails.fee ? parseFloat(specificTransactionDetails.fee).toFixed(4) : 0 } ${specificTransactionDetails?.from_crypto_name || ''}`}
                                                </Typography>
                                            ) : (
                                                <p className='d-flex justify-content-end'></p>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:0, marginTop:'5%'}}>

                                        <div>
                                            <p className='text-muted mx-2' style={{marginBottom:0.1}}>Status</p>
                                            {specificTransactionDetails ? (
                                                specificTransactionDetails?.status == 'Pending' ? (
                                                    <p className='text-warning' >{specificTransactionDetails.status}</p>

                                                ) : specificTransactionDetails.status == 'Approved' ? (
                                                <p className='text-success'>{specificTransactionDetails.status}</p>

                                                ) : specificTransactionDetails.status == 'Cancelled' ? (
                                                <p className='text-danger'>{specificTransactionDetails.status}</p>

                                                ) : (
                                                <p className='text-success'>{specificTransactionDetails.status}</p>
                                                )
                                            ) : (
                                                <>Transaction Status</>
                                            )}
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <p className='text-muted' style={{marginBottom:0.1}}>
                                               Received Amount
                                            </p>

                                            {specificTransactionDetails ? (
                                                <p>
                                                    {specificTransactionDetails.credit_quantity ? parseFloat(specificTransactionDetails.credit_quantity).toFixed(7) : 0} {specificTransactionDetails?.to_crypto_name || ''}
                                                </p>
                                            ) : (
                                                <p className='d-flex justify-content-end'></p>
                                            )}
                                        </div>

                                        <div>
                                            <p className='text-muted' style={{marginBottom:0.1}}>Total amount</p>
                                            <p>{CalculateTotalAmount(specificTransactionDetails.swap_quantity, specificTransactionDetails.fee)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </DialogContent>

                <DialogActions>
                {/* <Button autoFocus onClick={handleClose}>
                    Disagree
                </Button> */}
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};