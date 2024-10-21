import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, 
        TextField, InputAdornment, Button, Divider, FormControl, InputLabel } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import axiosInstance from '../Authentication/axios';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';


const Coin_Gecko_API     = import.meta.env.VITE_COIN_GECKO_API_KEY
const Coin_Gecko_API_URL = import.meta.env.VITE_COIN_GECKO_API_URL
const Free_currency_api  = import.meta.env.VITE_FREE_CURRENCY_API


const getCurrencyIcon = (currency)=> {
     switch (currency){
        case 'USD':
            return '$'
        case 'EUR':
            return '€'
        case 'INR':
            return '₹'
        case 'GBP':
            return '£'
        default:
            return '$'
     }
};


// Convert the Crypto name according to coin gecko Ids
const handleGetCryptoIds = (cryptoName)=> {
    if (cryptoName) {
        switch(cryptoName) {
            case 'BTC':
                return 'bitcoin'

            case 'ETH':
                return 'ethereum'

            case 'SOL':
                return 'solana'

            case 'XRP':
                return 'ripple'

            case 'DOGE':
                return 'dogecoin'

            case 'LTC':
                return 'litecoin'

            case 'BNB':
                return 'binancecoin'
            
            default:
                return 'bitcoin'
        }
    };
};



export default function BuyCrypto({open, setOpen}) {
    const handleClose                          = () => setOpen(false);
    const [operation, setOperation]            = useState('buy'); // Operatin Name
    const [crypto, setCrypto]                  = useState('');    // Selected Crypto
    const [cryptoWallets, updateCryptoWallets] = useState([]);    // Crypto Wallet from API
    const [paymentType, setPaymentType]        = useState('');    // Payment Type state
    const [walletAddress, setWalletAddress]    = useState('');    // Wallet Address state
    const [userWallets, setUserWallets]        = useState([]);    // user Wallets from API
    const [Walletcurrency, setWalletCurrency]  = useState('');    // Wallet ID state
    const [findWalletCurrencyName, setFindWalletCurrencyName] = useState('');  // Currency Name
    const [chargedFee, SetChargedFee]          = useState(0);  // Fee charged for Crypto Buy Transactions state
    const [exchangeAmount, setExchangeAmount] = useState(0);   // Buying Amount
    const [exchangeResult, setExchangeResult] = useState(0); // Converted Crypto
    const [cryptoName, setCryptoName]         = useState('');
    const [successMessage, setSuccessMessag]  = useState('');  // Sucess Message state
    const [error, setError]                   = useState('');  // Error Message

    const [convertedUSDValue, setConvertedUSDValue]               = useState(0);  // Value after crypto conversion
    const [currencyConversionAmount, setCurrencyConversionAmount] = useState(0); // From Crypto usd to Wallet currency




    // Fetch all the available crypto wallet of user
    useEffect(() => {
        axiosInstance.get(`/api/v2/user/crypto/wallets/`).then((res)=> {

            if (res.status === 200 && res.data.success === true) {
                updateCryptoWallets(res.data.user_crypto_wallets)
            }

        }).catch((error)=> {
            // console.log(error);
        })
    }, []);


    // Fetch wallet address according to the selected Crypto
    useEffect(() => {
        if (crypto) {
            axiosInstance.get(`/api/v2/user/crypto/wallet/address/${crypto}/`).then((res)=> {
    
                if (res.status === 200 && res.data.success === true) {
                    setWalletAddress(res.data.wallet_address)
                }
    
            }).catch((error)=> {
                // console.log(error);
            })
        }
    }, [crypto]);


    // Fetch available wallet of the User
    useEffect(() => {
        axiosInstance.get(`/api/v3/user/wallet/`).then((res)=> {
            // console.log(res)

            if (res.status === 200) {
                setUserWallets(res.data.user_wallet_data)
            }

        }).catch((error)=> {
            // console.log(error);
        })
    }, []);

     
    /// Get currency name from user wallets
    useEffect(() => {
         if (userWallets && Walletcurrency) {
            const findWalletCurrency = userWallets.find((wallet)=> wallet.id === Walletcurrency)
            setFindWalletCurrencyName(findWalletCurrency.currency)
         }

    }, [userWallets, Walletcurrency])


    /// Get Crypto currency name from user wallets
    useEffect(() => {
         if (cryptoWallets && crypto) {
            const findCryptoCurrencyName = cryptoWallets.find((wallet)=> wallet.id === crypto)
            setCryptoName(findCryptoCurrencyName.crypto_name)
         }

    }, [cryptoWallets, crypto])


    // Get assigned fee for Crypto Buy Transaction
    useEffect(() => {
       if (exchangeAmount) {
         axiosInstance.post(`/api/v2/charged/fee/`, {
            fee_type: 'Crypto Buy',
            amount: exchangeAmount

         }).then((res)=> {

            if (res.status === 200 && res.data.success === true){ 
                SetChargedFee(res.data.fee)
            }
         })
       }
    }, [exchangeAmount]);
    

    // Get usd value of crypto from CoinGecko
    useEffect(() => {
      if (cryptoName) {
        const crypto_ids = handleGetCryptoIds(cryptoName);

        axiosInstance.get(`${Coin_Gecko_API_URL}/api/v3/simple/price/?ids=${crypto_ids}&vs_currencies=usd&x_cg_demo_api_key=${Coin_Gecko_API}`).then(
            (res)=> {
                // console.log(res.data)
                // console.log('crypto', res.data[crypto_ids].usd)
                if ( res.status === 200) {
                    setConvertedUSDValue(res.data[crypto_ids].usd)

                    // handleConvertCurrency();
                }
            }
        ).catch((error)=> {
            // console.log(error)
        })
      } else {
        console.log('Crypto not available to convert')
      }
    }, [cryptoName]);



    // Convert Wallet currency value against USD
    useEffect(() => {
        if (findWalletCurrencyName) {
            const freecurrencyapi = new Freecurrencyapi(Free_currency_api);

            setTimeout(() => {
                freecurrencyapi.latest({
                    base_currency: 'USD',
                    currencies: findWalletCurrencyName
    
                }).then(response => {
                    // console.log(response.data[findWalletCurrencyName]);
                    setCurrencyConversionAmount(response.data[findWalletCurrencyName])
                });
            }, 1500);
            
        } else {
            console.log('Wallet Currency not available to convert')
        };

    }, [findWalletCurrencyName]);
    


    // Calculate Crypto value
    useEffect(() => {
        setTimeout(() => {
            if (currencyConversionAmount && exchangeAmount && convertedUSDValue) {
                const AmountToBeConvert = parseFloat(exchangeAmount) / (parseFloat(currencyConversionAmount) * parseFloat(convertedUSDValue))
                setExchangeResult(AmountToBeConvert)

            } else {
                console.log('currencyConversionAmount not present')
            }

        }, 1000);
    }, [exchangeAmount, currencyConversionAmount, convertedUSDValue]);
    


    // Submit Crypto Buy Data
    const handleSubmitCryptoBuyData = ()=> {

        if (!exchangeAmount) {
            setError('Please type valid amount')
        } else {

            axiosInstance.post(`/api/v2/user/crypto/buy/`, {
                crypto_wallet_id: parseInt(crypto),
                payment_type: paymentType,
                wallet_id: parseInt(Walletcurrency),
                buy_amount: parseFloat(exchangeAmount),
                converted_crypto_quantity: parseFloat(exchangeResult)
    
            }).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessag('Crypto purchased successfully, Please wait for admin approval')
    
                    setTimeout(() => {
                        setSuccessMessag('')
                        handleClose();
                    }, 2500);
                };
    
            }).catch((error)=> {
                // console.log(error)
    
                if (error.response.data.message === 'Invalid Crypto Wallet') {
                    setError('Invalid Crypto wallet')
                } else if (error.response.data.message === 'Invalid Wallet') {
                    setError('Invalid user wallet')
                } else if (error.response.data.message === 'Insufficient fund') {
                    setError('Insufficient fund in wallet')
                } else if (error.response.data.message === 'Crypto wallet has not approved') {
                    setError('Crypto wallet has not Approved yet')
                } else {
                    setError('')
                };
    
                setTimeout(() => {
                    setError('');
                }, 2500);
    
            });
        };

    };
   



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ p: 3, maxWidth: '400px', mx: 'auto', borderRadius: '8px', boxShadow: 3, backgroundColor: 'white', overflow:'auto', maxHeight: '100vh' }}>
                    <Typography variant="h6" gutterBottom>Buy Crypto Currency</Typography>
                    
                    {/* Buy/Sell Toggle */}
                    <RadioGroup
                        row
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        sx={{ mb: 2 }}
                        color='success'
                    >
                        <FormControlLabel value="buy" control={<Radio color='success' />} label="Buy" />    
                    </RadioGroup>  
                    
                    {/* Crypto Selection */}
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Select Crypto</InputLabel>
                        <Select
                            value={crypto}
                            onChange={(e) => setCrypto(e.target.value)}
                            label='Select Crypto'
                        >
                            {cryptoWallets.map((wallet, index)=> (
                                <MenuItem key={index} value={wallet.id}>{wallet.crypto_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Payment Type */}
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                            <Select
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                label="Payment Type"
                                >
                            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                            <MenuItem value="Paypal">Paypal</MenuItem>
                            <MenuItem value="UPI">UPI</MenuItem>
                            <MenuItem value="Stripe">Stripe</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Wallet Address */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={walletAddress ? walletAddress : ''}
                        disabled
                        sx={{ mb: 2 }}
                        label='Wallet Address'
                        inputProps={{
                            sx: {
                                fontSize: '12px'
                            }
                        }}
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Select Wallet Currency</InputLabel>
                        <Select
                            value={Walletcurrency}
                            label="Select Wallet Currency"
                            onChange={(e) => setWalletCurrency(e.target.value)}
                            >
                                {userWallets.map((wallet, index)=> (
                                    <MenuItem key={index} value={wallet.id}>{wallet.currency}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            type='number'
                            value={exchangeAmount}
                            onChange={(e) => {setExchangeAmount(e.target.value)}}
                            sx={{ mr: 1, flexGrow: 1 }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{getCurrencyIcon(findWalletCurrencyName)}</InputAdornment>,
                            }}
                        />
                        <SwapHorizIcon sx={{ mx: 2 }} />

                        <TextField
                            value={exchangeResult}
                            disabled
                            sx={{ flexGrow: 1 }}
                        />
                    </Box>

                    <Typography variant="body2" color="textSecondary" gutterBottom>Fee Charge: {getCurrencyIcon(findWalletCurrencyName)} {chargedFee}</Typography>
                    
                    <Divider sx={{ my: 2 }} />

                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmitCryptoBuyData}>Proceed</Button>

                    <p style={{color:'green', display:'flex', justifyContent:'center'}}>{successMessage && successMessage}</p>
                    <p style={{color:'red', display:'flex', justifyContent:'center'}}>{error && error}</p>
                </Box>

            </Modal>
        </div>
    );
}
