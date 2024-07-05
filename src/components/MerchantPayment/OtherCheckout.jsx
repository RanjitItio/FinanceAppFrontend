import React from 'react';
import { Box, Paper, Typography, TextField, Button, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axiosInstance from '../Authentication/axios';





export default function OtherPaymentCheckoutForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const states = location.state || ''

    const initialFormData = {
        card_number : '',
        // card_cvc    : '',
        // card_expiry : '',
        country     : ''
    }

    const [expiration, setExpiration]           = useState('');
    const [cvc, setCvc]                         = useState('');
    const [formData, updateFormData]            = useState(initialFormData)
    const [cardNumberError, setCardNumberError] = useState('');
    const [disableButton, setDisablButton]      = useState(false);
    const [error, setError]                     = useState('');


    const handleExpirationChange = (e)=> {
        let value = e.target.value;

        value = value.replace(/\D/g, '');

        if (value.length > 4) {
            value = value.slice(0, 4);
          }

        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        setExpiration(value);
    };

    const handleCardNumberChange = (event)=> {
        let value = event.target.value

        if (value.length > 16) {
            setCardNumberError('Invalid card number')
        } else if (typeof(value)) {
            setCardNumberError('')
        } 

    };


    const handleCvcChange = (e) => {
        let value = e.target.value;

        value = value.replace(/\D/g, ''); 
    
        if (value.length > 3) {
          value = value.slice(0, 3);
        }
    
        setCvc(value);
      };

      ///Manage page response if no state value is present
      if(states === '') {
        return (
            <p>No payment method available</p>
        )
      };

      const handleFormValueChange = (event) => {
        updateFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

      const handleFormSubmit = (event)=> {

           if (formData.card_number === '') {
                setError('Please type card number')

           } else if (cvc === '') {
                setError('Please type cvc number')

           } else if (expiration === '') {
                setError('Please type expiration number')

           } else if (formData.country === '') {
                setError('Please select Country')

           } else {
                setError('')

                axiosInstance.post(`api/merchant/arrear/payment/`, {

                    merchant_key: states.merchant,
                    merchant_id:  states.merchant_id,
                    card_number:  formData.card_number,
                    card_expiry:  expiration,
                    cvc:          cvc,
                    country:      formData.country,
                    currency:     states.currency,
                    amount:       parseInt(states.amount),
                    pay_mode:     states.pay_mode,
                    product:      states.itemName,
                    order_id:     states.orderNumber,
                    msg:          states.custom,
                    url:          states.redirect_url

                }).then((res)=> {
                    // console.log(res)
                    setDisablButton(true)

                    if (res.status === 200) {
                        // console.log(res.data.redirect_url)

                        setTimeout(() => {
                            // navigate('/payment/form/success/', {state: {redirect_url: states.redirect_url}})
                            window.location.href = res.data.redirect_url
                        }, 1000); 
                    }

                }).catch((error)=> {
                    console.log(error)

                    if (error.response.data.msg === 'Invalid Merchant key') {
                        setDisablButton(true)
                        setTimeout(() => {
                            navigate('/payment/form/fail/', {state: {msg: 'Invalid Merchant Key', redirect_url: states.redirect_url}})
                         }, 1000);

                    } else if (error.response.data.msg === 'Requested merchant not found') {
                        setDisablButton(true)
                        setTimeout(() => {
                            navigate('/payment/form/fail/', {state: {msg: 'Merchant does not exists', redirect_url: states.redirect_url}})
                         }, 1000);

                    } else if (error.response.data.msg === 'Merchant fetch error') {
                        setDisablButton(true)
                        setTimeout(() => {
                            navigate('/payment/form/fail/', {state: {msg: 'Server Error', redirect_url: states.redirect_url}})
                         }, 1000);

                    } else if (error.response.data.msg === 'Requested currency not available') {
                        setDisablButton(true)
                        setTimeout(() => {
                            navigate('/payment/form/fail/', {state: {msg: 'Currency does not exists', redirect_url: states.redirect_url}})
                         }, 1000);

                    } else if (error.response.data.msg === 'Merchant wallet not available') {
                        setDisablButton(true)
                        setTimeout(() => {
                            navigate('/payment/form/fail/', {state: {msg: 'Merchant does not have wallet', redirect_url: states.redirect_url}})
                         }, 1000);

                    } else if (error.response.data.msg === 'Server error') {
                        setDisablButton(true)
                        setTimeout(() => {
                            navigate('/payment/form/fail/', {state: {msg: 'Server error occure', redirect_url: states.redirect_url}})
                         }, 1000);

                    }
                })
           }
      };


    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
        }}
        >
        <Paper
            elevation={3}
            sx={{
            maxWidth: '400px',
            width: '100%',
            padding: '20px',
            borderRadius: '10px',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Transaction Details
            </Typography>

            <Typography variant="body2" gutterBottom>
                You are sending
            </Typography>
            <Typography variant="h5" color="orange" gutterBottom>
                {states.currency} {states.amount}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="body2">Medium</Typography>
            <img 
                src={states.img} 
                alt='Stripe logo'
                style={{ maxWidth: '60px' }}
            />
            </Box>

            <TextField
                label="Card number"
                type='number'
                name='card_number'
                value={formData.card_number}
                onChange={(event)=> {handleFormValueChange(event); handleCardNumberChange(event); }}
                placeholder='1234 1234 1234 1234'
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '10px'}}
                error={Boolean(cardNumberError)}
                helperText={cardNumberError}
                inputProps={{maxLength: 16, inputMode: 'numeric', pattern: '\\d*'}}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <TextField
                label="Expiration"
                placeholder='MM/YY'
                variant="outlined"
                sx={{ width: '48%' }}
                value={expiration}
                onChange={handleExpirationChange}
            />
            <TextField
                label="CVC"
                type='number'
                placeholder='CVC'
                variant="outlined"
                sx={{ width: '48%' }}
                onChange={handleCvcChange}
                value={cvc}
            />
            </Box>

            <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <InputLabel>Country</InputLabel>
            <Select
                label="Country"
                // defaultValue=""
                value={formData.country}
                variant="outlined"
                name='country'
                onChange={handleFormValueChange}
            >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
            </Select>
            </FormControl>

            <Button 
                variant="contained" 
                fullWidth 
                sx={{ marginBottom: '10px', backgroundColor: '#6200ea' }}
                disabled={disableButton}
                onClick={handleFormSubmit}
            >
                Confirm Payment
            </Button>

            {error && <Alert severity="warning">{error}</Alert>}

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="back" sx={{ color: '#ffffff70' }}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Box>

        </Paper>
        </Box>
    );
}
