import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import axiosInstance from '../Authentication/axios';



function SlideTransition(props) {
    
    return <Slide {...props} direction="up" />;
  }



export default function PaymoneyCheckout() {
    const location = useLocation();
    const navigate = useNavigate();
    const states = location.state

    const initialFormData = {
        email: '',
        password: ''
    }

    const [state, setState]                   = useState({open: false,Transition: Fade});
    const [formData, updateFormData]          = useState(initialFormData);
    const [error, setError]                   = useState('');
    const [buttonDisable, setButtonDisable]   = useState(false);


    const handleClick = (Transition) => () => {
        setState({
          open: true,
          Transition,
        });
      };
    
      const handleClose = () => {
        setState({
          ...state,
          open: false,
        });
      };

    

    const handleFormValueChange = (e)=> {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };


    const handleFormSubmit = ()=> {
        if (formData.email === '') {
            handleClick(SlideTransition)();
            setError('Please type your email address')

        } else if (formData.password === '') {
            setError('Please type your password')
            handleClick(SlideTransition)();

        } else {
            setError('')

            axiosInstance.post(`/api/merchant/wallet/payment/`, {
                merchant_key: states.merchant,
                merchant_id:  states.merchant_id,
                product_name: states.itemName,
                order_number: states.orderNumber,
                amount:       parseInt(states.amount),
                custom:       states.custom,
                currency:     states.currency,
                email:        formData.email,
                password:     formData.password

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200) {
                    setButtonDisable(true)
                    navigate('/payment/form/success/')
                }

            }).catch((error)=> {
                console.log(error)

                if (error.response.data.msg === 'Merchant is not active to make payment') {
                    setButtonDisable(true)
                     setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Inactive Merchant'}})
                     }, 1000);
                     

                } else if (error.response.data.msg === 'Requested merchant not found') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Unidentified Merchant'}})
                     }, 1000);

                } else if(error.response.data.msg === 'Requested currency not available') {
                    setButtonDisable(true)
                     setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Unrecognized Currency'}})
                     }, 1000);

                } else if (error.response.data.msg === 'Merchant wallet not available') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Merchant wallet not available'}})
                     }, 1000);

                } else if (error.response.data.msg === 'Payer does not exist') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Unregistered User'}})
                     }, 1000);

                } else if (error.response.data.msg === 'Incorrect Password') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Wrong password'}})
                     }, 1000);

                } else if (error.response.data.msg === 'Payer donot have wallet') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Wallet not found'}})
                     }, 1000);

                } else if (error.response.data.msg === 'Payer donot have sufficient wallet balance') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Insufficient fund in wallet'}})
                     }, 1000);

                }else if (error.response.data.msg === 'Can not pay to yourself') {
                    setButtonDisable(true)
                    setTimeout(() => {
                        navigate('/payment/form/fail/', {state: {msg: 'Can not pay to yourself'}})
                     }, 1000);
                }
            })
        }
    };

    const handleBackButtonClicked = ()=> {
        const merchant      = btoa(states.merchant)
        const merchant_id   = btoa(states.merchant_id)
        const item_name     = btoa(states.itemName)
        const order_number  = btoa(states.orderNumber)
        const amount        = btoa(states.amount)
        const custom        = btoa(states.custom)
        const currency      = btoa(states.currency)

        navigate(`/payment/form/?merch=${merchant}&merch_id=${merchant_id}&item=${item_name}&order_no=${order_number}&amt=${amount}&custom=&${custom}&cur=${currency}`)
    };


    if (!states) {
        return (
            <p>No payment details</p>
        )
    };


    return (
    <>
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
        <Paper elevation={3} sx={{ maxWidth: '400px', padding: '20px', borderRadius: '20px' }}>
            
            <Typography variant="h6" gutterBottom>
                Transaction Details
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <small>You are sending</small>
                <Typography variant="body2" gutterBottom>
                    Medium
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Typography variant="h5" gutterBottom sx={{marginBottom: '10px'}}>
                    <b>{states.currency} {states.amount}</b>
                </Typography>
                <img 
                   src='https://python-uat.oyefin.com/media/paymentForm/paymoney.png' 
                   alt='Pay medium logo'
                   style={{maxWidth: '50px'}}
                   />
            </Box>

            <TextField 
                 id="outlined-email" 
                 name='email' 
                 label="Email Address" 
                 variant="outlined" 
                 fullWidth 
                 sx={{marginBottom: '10px'}}
                 onChange={handleFormValueChange}
                />
            
            <TextField 
                   id="outlined-password" 
                   name='password' 
                   label="Password" 
                   variant="outlined" 
                   type='password'
                   fullWidth 
                   sx={{marginBottom: '20px'}} 
                   onChange={handleFormValueChange}
                   />

            <Button 
                 variant="contained" 
                 fullWidth 
                 onClick={handleFormSubmit}
                 disabled={buttonDisable}
            >
                Pay with Paymoney
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <IconButton aria-label="back" onClick={handleBackButtonClicked}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Box>
        </Paper>
      </Box>

        <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            message={error}
            key={state.Transition.name}
            autoHideDuration={1800}
        />
        </>
    );
};





