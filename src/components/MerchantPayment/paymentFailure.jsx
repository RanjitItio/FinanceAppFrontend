import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';





export default function PaymentFailure() {
    const location = useLocation();

    const message    = location.state || ''
    const failed_msg = message.msg || 'Payment failed due to an unknown error'

    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
      });
    const { vertical, horizontal, open } = state;

    // const handleClick = (newState) => () => {
    //     setState({ ...newState, open: true });
    //   };
    
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


      if (message === '') {
        return (
            <p className='d-flex justify-content-center fs-3'>Payment Failed</p>
        )
      }

    return (
        <>
        <Snackbar
        open={open}
        autoHideDuration={20000}
        onClose={handleClose}
        message={failed_msg ? failed_msg : ''}
        action={action}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      />

        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
          },
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Paper elevation={3} sx={{ maxWidth: '400px', padding: '20px', borderRadius: '20px', minWidth: '300px' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <IconButton aria-label="cancel"  sx={{color:'red', fontSize: '10px'}}>
                    <CancelOutlinedIcon />
                </IconButton>
            </Box>

            <Typography variant="h6" gutterBottom sx={{display:'flex', justifyContent: 'center'}}>
                Sorry!
            </Typography>

            <Typography 
                  variant="p" 
                  gutterBottom  
                  sx={{display:'flex', justifyContent: 'center', marginBottom: '20px'}}
                  >
                Payment Unsuccessful 
            </Typography>

            <Button variant="contained" fullWidth>Home</Button>
            
        </Paper>
      </Box>
      </>
    );
};