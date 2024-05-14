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





export default function ResponsiveDialog({handleClickOpen, handleClose, boxOpen, specificTransaction}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const iconSize = isSmallScreen ? 32 : 40;
  const avatarSize = isSmallScreen ? 48 : 70;

  const transactionDate = new Date(specificTransaction.txddate);
  const formatedDate = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}-${String(transactionDate.getDate()).padStart(2, '0')}`

  const transactionTime = new Date(specificTransaction.txdtime);
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
                                    <p className='d-flex justify-content-center'>{specificTransaction.txdtype} amount</p>
                                    {specificTransaction.txdcurrency ? (
                                        <p className='d-flex justify-content-center mb-3 fs-5'><b>{specificTransaction.txdcurrency.name} {specificTransaction.amount}</b></p>
                                    ) : (
                                        <p className='d-flex justify-content-center mb-3 fs-5'><b>{specificTransaction.amount}</b></p>
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
                                    {specificTransaction.user_id ? (
                                      <p>{specificTransaction.user_id.first_name} {specificTransaction.user_id.lastname}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                    
                                </div>

                                <div>
                                    <p className='text-muted'>Currency</p>
                                    {specificTransaction.txdcurrency ? (
                                      <p className='d-flex justify-content-end'>{specificTransaction.txdcurrency.name}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                    
                                </div>
                                
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>Transaction ID</p>
                                    <small>{specificTransaction.txdid}</small>
                                </div>

                                <div>
                                    <p className='text-muted'>Transaction Fee</p>
                                    {specificTransaction.txdcurrency ? (
                                        <p className='d-flex justify-content-end'>{specificTransaction.txdcurrency.name} {specificTransaction.txdfee}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>Payment Method</p>
                                    <p>{specificTransaction.payment_mode}</p>
                                </div>

                                <div>
                                    <p className='text-muted mx-2'>Status</p>
                                    {specificTransaction.txdstatus == 'Pending' ? (
                                        <p className='text-warning'>{specificTransaction.txdstatus}</p>

                                    ) : specificTransaction.txdstatus == 'Success' ? (
                                      <p className='text-success'>{specificTransaction.txdstatus}</p>

                                    ) : specificTransaction.txdstatus == 'Cancelled' ? (
                                      <p className='text-danger'>{specificTransaction.txdstatus}</p>

                                    ) : (
                                      <p className='text-success'>{specificTransaction.txdstatus}</p>
                                    )}
                                    
                                </div>
                            </div>
                            <hr />

                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <p className='text-muted'>Cash amount</p>
                                    {specificTransaction.txdcurrency ? (
                                        <p>{specificTransaction.txdcurrency.name} {specificTransaction.amount}</p>
                                    ) : (
                                      <p className='d-flex justify-content-end'></p>
                                    )}
                                </div>
                                <div>
                                    <p className='text-muted'>Total amount</p>
                                    {specificTransaction.txdcurrency ? (
                                        <p>{specificTransaction.txdcurrency.name} {specificTransaction.totalamount}</p>
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
