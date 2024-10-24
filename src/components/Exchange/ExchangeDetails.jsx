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


/// Calculate Total Amount
const getTotalAmount = (amount, fee)=> {
    const total_amount = (parseFloat(amount) + parseFloat(fee))
    return total_amount;
};


// Exchange Deatils of a Exchange Transaction
export default function ExchangeDetails({handleClose, boxOpen, specificTransactionDetails}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const iconSize = isSmallScreen ? 32 : 40;
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
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 mb-2">
                    <div className="card rounded" style={{height: '21rem'}}>
                        <div className="card-body" style={{backgroundColor: '#c3c2d5'}}>
                                <Typography className='d-flex justify-content-center mb-3' variant='div'>
                                  <Avatar sx={{ width: avatarSize, height: avatarSize, backgroundColor: '#a6a3d3'}} >
                                      <ArrowOutwardIcon sx={{fontSize: iconSize, color:'#4f47bc'}}/>
                                  </Avatar>
                                </Typography>

                                <React.Fragment >
                                    {specificTransactionDetails ? 
                                    (<p className='d-flex justify-content-center'>Exchange Amount</p>) : ''
                                  }
                                    
                                    {specificTransactionDetails ? (
                                        <p className='d-flex justify-content-center mb-3 fs-5'><b>{specificTransactionDetails?.from_currency || ''} {specificTransactionDetails?.exchange_amount || 0}</b></p>
                                    ) : (
                                        <p className='d-flex justify-content-center mb-3 fs-5'><b></b></p>
                                    )}
                                    

                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:50}}>
                                        {specificTransactionDetails ? (
                                          <p>{specificTransactionDetails?.created_At?.split('T')[0] || ''} {specificTransactionDetails?.created_At?.split('T')[1] || ''}</p>
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
                        </div>
                    </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                    <div className="card rounded">
                        <div className="card-body">
                            <h5 className="card-title fs-5">Transaction Details</h5>
                            <hr className='mb-3'/>
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>From Currency</p>

                                    {specificTransactionDetails ? (
                                      <p>{specificTransactionDetails?.from_currency || ''}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                </div>

                                <div>
                                    <p className='text-muted'>To Currency</p>
                                    {specificTransactionDetails ? (
                                      <p className='d-flex justify-content-end'>{specificTransactionDetails?.to_currency || ''}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                </div>
                            </div>

                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div>
                                    <Typography variant='p' sx={{fontSize:{xs:'0.8rem'}}}>
                                        Exchange Amount
                                    </Typography>

                                      {specificTransactionDetails ? (
                                        <Typography sx={{color:'gray', fontSize: {xs:'0.8rem'}}}>{specificTransactionDetails.exchange_amount ? specificTransactionDetails.exchange_amount.toFixed(2) : 0} {specificTransactionDetails?.from_currency || ''}</Typography>
                                      ) : ''
                                    }
                                </div>

                                <div>
                                    <Typography variant='p' sx={{fontSize:{xs:'0.8rem'}}}>
                                        Fee
                                    </Typography>

                                      {specificTransactionDetails ? (
                                          <Typography sx={{fontSize:{xs:'0.8rem'}, whiteSpace: 'nowrap'}}>
                                            {`${specificTransactionDetails.transaction_fee ? specificTransactionDetails.transaction_fee.toFixed(2) : 0} ${specificTransactionDetails?.from_currency || ''}`}
                                          </Typography>
                                      ) : (
                                        <p className='d-flex justify-content-end'></p>
                                      )}
                                </div>
                            </div>

                            <div style={{display:'flex', justifyContent:'start', marginTop:10}}>

                                <div>
                                    <p className='text-muted'>Status</p>
                                    {specificTransactionDetails ? (
                                        specificTransactionDetails?.status == 'Pending' ? (
                                          <p className='text-warning'>{specificTransactionDetails.status}</p>

                                        ) : specificTransactionDetails.status == 'Approved' ? (
                                        <p className='text-success'>{specificTransactionDetails.status}</p>

                                        ) : specificTransactionDetails.status == 'Cancelled' ? (
                                        <p className='text-danger'>{specificTransactionDetails.status}</p>

                                        ) : (
                                        <p className='text-success'>{specificTransactionDetails.status}</p>
                                        )
                                    ) : (
                                      <>Status</>
                                    )}
                                    
                                </div>
                            </div>
                            <hr />

                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <p className='text-muted'>
                                      Received Amount
                                    </p>

                                      {specificTransactionDetails ? (
                                          <p>
                                            {specificTransactionDetails.converted_amount ? specificTransactionDetails.converted_amount.toFixed(3) : ''} {specificTransactionDetails?.to_currency || ''}
                                          </p>
                                      ) : (
                                        <p className='d-flex justify-content-end'></p>
                                      )}
                                </div>

                                <div>
                                    <p className='text-muted'>Total amount</p>
                                        {specificTransactionDetails && (
                                            <p>
                                                {getTotalAmount(specificTransactionDetails?.exchange_amount || 0, specificTransactionDetails?.transaction_fee || 0)} {specificTransactionDetails?.from_currency}
                                            </p>
                                        )}
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

)};