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







/// Fiat withdrawal details
export default function FiatWithdrawalDetails({handleClose, boxOpen, withdrawalDetails}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));  // Checking for small screen

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
                                            {withdrawalDetails ?  <p className='d-flex justify-content-center'>Withdrawal Amount</p> : <p className='d-flex justify-content-center'>Withdrawal Amount</p>}
                                            
                                            {withdrawalDetails ? (
                                                <p className='d-flex justify-content-center mb-3 fs-5'><b>{withdrawalDetails?.wallet_currency|| ''} {withdrawalDetails?.amount || ''}</b></p>
                                            ) : (
                                                <p className='d-flex justify-content-center mb-3 fs-5'><b></b></p>
                                            )}
                                            
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:50}}>
                                                {withdrawalDetails ? (
                                                    <p>{withdrawalDetails?.created_At?.split('T')[0] || ''} {withdrawalDetails?.created_At?.split('T')[1] || ''}</p>
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
                            <div className="card rounded" style={{height: '21rem'}}>
                                <div className="card-body">
                                    <h5 className="card-title fs-5">Transaction Details</h5>
                                    <hr className='mb-3'/>
                                    {/* <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <p className='text-muted'>Amount</p>
                                            {withdrawalDetails ? (
                                                <p className='d-flex justify-content-end'>{withdrawalDetails?.amount || ''} {withdrawalDetails?.wallet_currency || ''}</p>
                                            ) : (
                                                <p className='d-flex justify-content-end'></p>
                                            )}
                                        </div>
                                    </div> */}
        
                                    <div className="d-flex justify-content-around mb-3">
                                        <div>
                                            <Typography variant='p' sx={{fontSize:{xs:'0.8rem'}}}>
                                                Transaction ID
                                            </Typography>
        
                                                {withdrawalDetails ? (
                                                <Typography sx={{color:'gray', fontSize: {xs:'0.7rem'}}}>{withdrawalDetails?.transaction_id || ''}</Typography>
                                                ) : (
                                                <small>Transaction ID</small>
                                                )
                                            }
                                        </div>
        
                                        <div>
                                            <Typography variant='p' sx={{fontSize:{xs:'0.8rem'}}}>
                                                Fee
                                            </Typography>
        
                                                {withdrawalDetails ? (
                                                    <Typography sx={{fontSize:{xs:'0.8rem'}, whiteSpace: 'nowrap'}}>
                                                    {`${withdrawalDetails?.transaction_fee?.toFixed(2) || ''} ${withdrawalDetails?.wallet_currency || ''}`}
                                                    </Typography>
                                                ) : (
                                                <p className='d-flex justify-content-end'></p>
                                                )}
                                        </div>
                                    </div>
        
                                    <div className="d-flex justify-content-between mb-3">
        
                                        <div>
                                            <p className='text-muted mx-2'>Status</p>
                                            {withdrawalDetails ? (
                                                withdrawalDetails?.status == 'Pending' ? (
                                                    <p className='text-warning'>{withdrawalDetails?.status}</p>
        
                                                ) : withdrawalDetails?.status == 'Approved' ? (
                                                <p className='text-success'>{withdrawalDetails?.status}</p>
        
                                                ) : withdrawalDetails?.status == 'Cancelled' ? (
                                                <p className='text-danger'>{withdrawalDetails?.status}</p>
        
                                                ) : (
                                                <p className='text-success'>{withdrawalDetails?.status}</p>
                                                )
                                            ) : (
                                                <></>
                                            )}
                                            
                                        </div>
                                    </div>
                                    <hr />
        
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <p className='text-muted'>
                                              Received Amount
                                            </p>
        
                                            {withdrawalDetails ? (
                                                <p>
                                                {withdrawalDetails?.credit_amount?.toFixed(3) || ''} {withdrawalDetails?.credit_currency || ''}
                                                </p>
                                            ) : (
                                            <p className='d-flex justify-content-end'></p>
                                            )}
                                        </div>
        
                                        <div>
                                            <p className='text-muted'>Total amount</p>
                                                {withdrawalDetails ? 
                                                <p>
                                                    {withdrawalDetails?.total_amount || ''} {withdrawalDetails?.wallet_currency || ''}
                                                </p> :
                                                ''
                                                }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </DialogContent>
    
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                    Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};