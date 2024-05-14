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





export default function ResponsiveDialog({handleClickOpen, handleClose, boxOpen, specificTransactionDetails}) {
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const iconSize = isSmallScreen ? 32 : 40;
  const avatarSize = isSmallScreen ? 48 : 70;

  const transactionDate = new Date(specificTransactionDetails.txddate);
  const formatedDate = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}-${String(transactionDate.getDate()).padStart(2, '0')}`

  const transactionTime = new Date(specificTransactionDetails.txdtime);
  const formattedTime = `${String(transactionTime.getHours()).padStart(2, '0')}:${String(transactionTime.getMinutes()).padStart(2, '0')}:${String(transactionTime.getSeconds()).padStart(2, '0')}`;
  

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
          {/* {"Use Google's location service?"} */}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            <p>Content Text</p>
          </DialogContentText> */}

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
                                    <p className='d-flex justify-content-center'>{specificTransactionDetails.txdtype} amount</p>
                                    {specificTransactionDetails.txdcurrency ? (
                                        <p className='d-flex justify-content-center mb-3 fs-5'><b>{specificTransactionDetails.txdcurrency.name} {specificTransactionDetails.amount}</b></p>
                                    ) : (
                                        <p className='d-flex justify-content-center mb-3 fs-5'><b>{specificTransactionDetails.amount}</b></p>
                                    )}
                                    
                                    <p className='text-muted d-flex justify-content-center mb-5'>{formatedDate} {formattedTime}</p>

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
                                    <p className='text-muted'>Agent</p>
                                    {specificTransactionDetails.user_id ? (
                                      <p>{specificTransactionDetails.user_id.first_name} {specificTransactionDetails.user_id.lastname}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                    
                                </div>

                                <div>
                                    <p className='text-muted'>Currency</p>
                                    {specificTransactionDetails.txdcurrency ? (
                                      <p className='d-flex justify-content-end'>{specificTransactionDetails.txdcurrency.name}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                    
                                </div>
                                
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>Transaction ID</p>
                                    <small>{specificTransactionDetails.txdid}</small>
                                </div>

                                <div>
                                    <p className='text-muted'>Transaction Fee</p>
                                    {specificTransactionDetails.txdcurrency ? (
                                        <p className='d-flex justify-content-end'>{specificTransactionDetails.txdcurrency.name} {specificTransactionDetails.txdfee}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>Payment Method</p>
                                    <p>{specificTransactionDetails.payment_mode}</p>
                                </div>

                                <div>
                                    <p className='text-muted mx-2'>Status</p>
                                    {specificTransactionDetails.txdstatus == 'Pending' ? (
                                        <p className='text-warning'>{specificTransactionDetails.txdstatus}</p>

                                    ) : specificTransactionDetails.txdstatus == 'Success' ? (
                                      <p className='text-success'>{specificTransactionDetails.txdstatus}</p>

                                    ) : specificTransactionDetails.txdstatus == 'Cancelled' ? (
                                      <p className='text-danger'>{specificTransactionDetails.txdstatus}</p>

                                    ) : (
                                      <p className='text-success'>{specificTransactionDetails.txdstatus}</p>
                                    )}
                                    
                                </div>
                            </div>
                            <hr />

                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <p className='text-muted'>Cash amount</p>
                                    {specificTransactionDetails.txdcurrency ? (
                                        <p>{specificTransactionDetails.txdcurrency.name} {specificTransactionDetails.amount}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                </div>
                                <div>
                                    <p className='text-muted'>Total amount</p>
                                    {specificTransactionDetails.txdcurrency ? (
                                        <p>{specificTransactionDetails.txdcurrency.name} {specificTransactionDetails.totalamount}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
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
  );
}
