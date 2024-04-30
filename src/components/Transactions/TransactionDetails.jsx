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




export default function ResponsiveDialog({handleClickOpen, handleClose, boxOpen}) {
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
                                <Typography className='d-flex justify-content-center mb-3'>
                                <Avatar sx={{ width: avatarSize, height: avatarSize, backgroundColor: '#a6a3d3'}} >
                                    <ArrowOutwardIcon sx={{fontSize: iconSize, color:'#4f47bc'}}/>
                                </Avatar>
                                </Typography>
                            <p className='d-flex justify-content-center'>Cashout amount</p>
                            <p className='d-flex justify-content-center mb-3 fs-5'><b>$ 5</b></p>
                            <p className='text-muted d-flex justify-content-center mb-5'>31-03-2024 9:46 AM</p>

                            <div className='d-flex justify-content-center'>
                                <Button variant="outlined" startIcon={<PrintIcon />}>
                                    Print
                                </Button>
                            </div>

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
                                    <p>Agent Techvill</p>
                                </div>

                                <div>
                                    <p className='text-muted'>Currency</p>
                                    <p className='d-flex justify-content-end'>USD</p>
                                </div>
                                
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>Transaction ID</p>
                                    <p>31B796C206CE8</p>
                                </div>

                                <div>
                                    <p className='text-muted'>Transaction Fee</p>
                                    <p className='d-flex justify-content-end'>$1.13</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='text-muted'>Payment Method</p>
                                    <p>Cash</p>
                                </div>

                                <div>
                                    <p className='text-muted mx-2'>Status</p>
                                    <p className='text-success'>Success</p>
                                </div>
                            </div>
                            <hr />

                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <p className='text-muted'>Cash amount</p>
                                    <p>$ 5</p>
                                </div>
                                <div>
                                    <p className='text-muted'>Total amount</p>
                                    <p>$ 6.13$</p>
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
